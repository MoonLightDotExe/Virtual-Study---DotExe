const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    name: {
        type: String
    },
    members: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }]
})

module.exports = mongoose.model('chats', chatSchema)