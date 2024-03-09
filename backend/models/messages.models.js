const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String
    },
    sender: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    chat: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Chat'
    },
    attachments: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('messages', messageSchema)