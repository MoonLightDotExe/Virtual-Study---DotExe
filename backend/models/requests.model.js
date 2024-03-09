const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected']
    },
    sender: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    receiver: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
})

module.exports = mongoose.model('requests', requestSchema)