// Mongoose User Model

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    timelines: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Timeline' 
        }
    ]
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User; 