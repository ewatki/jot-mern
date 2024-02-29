// Mongoose Timeline Model

const mongoose = require('mongoose')

const timelineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    periodType: { 
        type: String, 
        required: true 
    },
    periods: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Period' 
        }
    ]
},
{
    timestamps: true
})

const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline; 