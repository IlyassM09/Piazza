//init 
const express = require('express')
const route = express.Router()
// needed to build the interaction that we will save in the db
const Interaction = require('../models/Interaction')
// needed to get the message id
const Message = require('../models/Message')
// needed to get the username
const User = require('../models/User')
// needed for the authentication 
const verify = require('../verifytoken')

// import verification
const {expirationVerification,messageExpirationCountDown} = require('../verification/interactionverification')

route.post('/:messageId',verify,async(req,res)=>{

    const message = await Message.findOne({_id: req.params.messageId})
    if(!message){
        return res.status(400).send({message: "The message you are trying to interact with doesn't exist"})
    }

    // verify the message the user is interacting with didn't expire 
    const messageExpired = expirationVerification(message.postExpiration)

    
    if(messageExpired){
        return res.status(400).send({message : " The user can't interact with expired messages"})
    }


    // verify like and and dislike are not both true
    if(req.body.like && req.body.dislike){
        return res.status(400).send({message: "The user can't both like and dislike the post in the same interaction."})
    }

    
    //get user with the help of the id
    const user = await User.findOne({_id :req.user._id})

    // exit the application if the user is trying to like or dislike their own post 
    if( req.body.like || req.body.dislike){
        if(user.username == message.name){
            return res.status(400).send({message: "The user can't like or dislike their own post"})
        }
    }

    //message expiry countdown in the interaction
    const countdown = messageExpirationCountDown(message.postExpiration)

    const interaction = new Interaction ({
        postId : req.params.messageId,
        like: req.body.like,
        dislike: req.body.dislike,
        comment : req.body.comment, 
        username :user.username,
        timeBeforeExpiry: countdown

    })

    try{
        // update the interaction 
        const interactionToSave = await interaction.save()

        const messageUpdate ={}
        //update the message board
        // update like and dislike
        if(req.body.like){
            messageUpdate.$inc = {likes:1}
        }else if(req.body.dislike){
            messageUpdate.$inc = {dislikes :1}
        }

        //update comment 
        if(req.body.comment){

            messageUpdate.$push={}

            messageUpdate.$push.comments ={
                text : req.body.comment, 
                createdAt: new Date(Date.now()), 
                createdBy: user.username
            }
        }

        
        //update Message
        const updatedMessage = await Message.findOneAndUpdate(
                {_id: req.params.messageId},
                messageUpdate,
                {new: true}
            )
        
        
        res.status(200).send({
            interaction: interactionToSave,
            message: updatedMessage
        })
        

    }catch(error){
        res.status(400).send({message : "Your interaction with the post didn't save" })
    }
})

module.exports = route