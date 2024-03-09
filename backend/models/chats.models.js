const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    user1: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    user2: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    chat: [{
        sender: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        },
        text: {
            type: String
        }
    }]
})

module.exports = mongoose.model('users', chatSchema)