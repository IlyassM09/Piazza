//init 
const mongoose = require('mongoose')

const interactionSchema = new mongoose.Schema(
    {
        postId :{
            type: String, 
            required: true
        },
        like :{
            type: Boolean,
        },
        dislike :{
            type: Boolean,
        },
        comment :{
            type: String,
        }, 
        username:{
            type: String, 
        },
        timeBeforeExpiry:{
            type: Number,
        }
    },
    {
        collection: 'interactions', 
        timestamps: true
    }

)

module.exports = mongoose.model('Interaction',interactionSchema,'interactions')