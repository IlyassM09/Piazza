// init 
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {userVerification,loginVerification} = require('../verification/verification')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv/config')

//post
router.post('/registration',async(req,res)=>{

    // verify user registration input 
    const {error} = userVerification(req.body)

    if(error){
        return res.status(400).send({message : error["details"][0]["message"] })
    }
    // check if username already in use 
    const usernameAlreadyExists = await User.findOne({username: req.body.username})
    if(usernameAlreadyExists){
        return res.status(400).send({message : 'username already exists'})
    }

    //Check if email already exists
    const emailAlreadyExists =  await User.findOne({email: req.body.email})
    if(emailAlreadyExists){
        return res.status(400).send({message : 'email already exists'})
    }

    //hashing the password
    const salt = await bcrypt.genSalt(6)
    const hashedpassword = await bcrypt.hash(req.body.password,salt)

    //Post the user to the DB 
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedpassword
    })
    
    try{
        const userToSave = await user.save()
        res.send(userToSave)
    }catch(error){
        res.status(400).send({error : " Couldn't save the user"})
    }
})

//route 
router.post('/login',async(req,res)=>{
    // verify user login input
    const {error} = loginVerification(req.body)
    if(error){
        return res.status(400).send({message : error["details"][0]["message"] })
    }

    // check the email exists
    const user =  await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send({message : 'email is not registered'})
    }

    // check the password is correct 
    const passwordCorrect = bcrypt.compare(req.body.password,user.password)
    if(!passwordCorrect){
        return res.status(400).send({message : 'password incorrect'})
    }

    // generate token
    const token = jsonwebtoken.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})
})

router.get('/',async(req,res)=>{
    
    try{
        const users = await User.find()
        res.send(users)

    }catch(error){
        res.status(400).send({message : 'Something went wong with you GET request for users'})
    }
})

//export 
module.exports = router