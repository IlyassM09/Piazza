// init
const { required } = require('joi')
const mongoose = require('mongoose')


//Message schema 
const messagSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        topic : {
            type: Array, 
            Default: [],
            required :true
        },
        message : {
            type: String, 
            required: true,
            max : 140, // SMS limitation and original limit of the OG twitter. 
        },
        postExpiration : {
            type: Date,
            required :true,
            min: Date.now()
        
        },
        status :{
            type: String,
            required: true
        },
        name :{
            type: String,
            required: true
        }, 
        likes:{
            type: Number, 
            default: 0
        },
        dislikes:{
            type: Number,
            default:0
        },
        comments :{
            type : Array,
            default :[]
        }

    },
    {
        collection: 'messages',
        timestamps : true
    }
)


module.exports = mongoose.model('Message',messagSchema,'messages')