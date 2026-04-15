//init 
const express = require('express')
const route = express.Router()
const Message = require('../models/Message')
const User = require('../models/User')
const verify = require('../verifytoken')
const {topicVerification,statusVerification} = require('../verification/messageverification')
const {addMinutes , format} = require('date-fns')


//Route
// post
route.post('/',verify,async(req,res)=>{

    const topicsValid = topicVerification(req.body.topic)
    
    if(!topicsValid){
        return res.status(400).send({message : "List of topics is invalid, list of accepted topics ['Tech' , 'Politics', 'Health' , 'Sport']"})
    }

    //get user with the help of the id
    const user = await User.findOne({_id :req.user._id})

    const message = new Message({
        title: req.body.title,
        topic: req.body.topic,
        message : req.body.message,
        postExpiration : format(addMinutes(Date.now(),req.body.postExpiration),"yyyy-MM-dd HH:mm:ss"),
        status : 'Live',
        name: user.username,
    })

    try{
        const messageToSave = await message.save()
        res.send(messageToSave)

    }catch(error){
        res.status(400).send({message : "Your message wasn't saved"})
    }
    
})

//get posts per topic
route.get('/:topic',verify,async(req,res)=>{   
    try{
        const messages = await Message.find({topic : req.params.topic}).exec();

        for (const message of messages){
            // need to update the message status if it has already expired
            const messageStatus = statusVerification(message.postExpiration)
            if(messageStatus != message.status){
                await Message.findOneAndUpdate(
                        {_id : message._id},
                        {$set : {
                            status : messageStatus
                        }}
                )      
            }
        }

        // this is a lazy way of doing the job instead sending another query to the DB I could 
        const messagesToDisplay = await Message.find({topic : req.params.topic}).exec();

        res.send(messagesToDisplay)

    }catch(error){
        res.status(400).send({message : "Unable to return messages per topic"})
    }

})

// get most active messages per topic
route.get('/:topic/mostactive',verify,async(req,res)=>{

    try{
        const messages = await Message.find({topic : req.params.topic}).exec();

        //update expiry 
        for (const message of messages){
                // need to update the message status if it has already expired
            
                const messageStatus = statusVerification(message.postExpiration)
                if(messageStatus != message.status){
                    await Message.findOneAndUpdate(
                            {_id : message._id},
                            {$set : {
                                status : messageStatus
                            }}
                    )      
                }
            }

        // message activity
        const activityMatrix = []
        for(const message of messages){
            const activity = message.likes + message.dislikes
            activityMatrix.push({messageId : message._id, messageActivity: activity})
        }
        // find most active messages 
        let mostActivity = 0
        for( const activity of activityMatrix){
            if(activity.messageActivity >= mostActivity){
                mostActivity = activity.messageActivity
            }
        }
        

        // messages to display 
        const messagesToDisplay = []
        for( const activity of activityMatrix){
            if(activity.messageActivity == mostActivity){
                const message = await Message.find({_id : activity.messageId})
                messagesToDisplay.push(message)
            }
        }

        res.send(messagesToDisplay)
    } catch(error){
        res.status(400).send({message : "Couldn't extract the most active messages!"})
    }
    

})

// Browse the history data of expired posts per topic 
route.get('/:topic/expired',verify,async(req,res)=>{
    try{

        const messages = await Message.find({topic : req.params.topic}).exec();

        // Array to store updated messages
        const updatesMessageArray = []

        //update expiry 
        for (const message of messages){
            // need to update the message status if it has already expired
            const messageStatus = statusVerification(message.postExpiration)
            if(messageStatus != message.status){
                const updatedMessage = await Message.findOneAndUpdate(
                        {_id : message._id},
                        {$set : {
                            status : messageStatus
                        }}
                )

                updatesMessageArray.push(updatedMessage)
            } else {
                updatesMessageArray.push(message)
            }
        }

    

        // array to store expired messages 
        const expiredMessageArray = []
        for ( const updatedMessage of updatesMessageArray){

            if(updatedMessage.status == 'Expired'){
                expiredMessageArray.push(updatedMessage)
            }
        }

        res.send(expiredMessageArray)  


    }catch(error){
        res.status(400).send({message: "Couldn't extract expired posts"})
    }
})
module.exports = route