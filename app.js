// init 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute = require('./routes/users')
const messageRoute = require('./routes/messages')
const interactionRoute = require('./routes/interactions')
const mongoose = require('mongoose')
require('dotenv/config')

app.use(bodyParser.json())

//middleware
app.use('/api/users',userRoute)
app.use('/api/messages',messageRoute)
app.use('/api/interactions',interactionRoute)

//Router 
app.get('/api',(req,res)=>{
    res.send({message : 'Welcome to the Piazza API. Please read our documentation for information on how to use our API.'})
})

// connect to the DB
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('you are connected to the DB')
})



// use port 80 to allow firewall access in the server
app.listen(80,()=>{
    console.log('You are now connected to the server. Happy coding. ')
})