// Mongoose Period Model

const mongoose = require('mongoose')

const periodSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    }, 
    endDate: {
        type: Date, 
    }, 
    timeline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timeline'
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

const Period = mongoose.model('period', periodSchema);

module.exports = Period; 