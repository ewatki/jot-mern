// Mongoose Period Model

const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: { 
        type: String,
        required: true
    },
    period: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Period'
    },
    timeline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timeline'
    },
}, 
{
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note; 