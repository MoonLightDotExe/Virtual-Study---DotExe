const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    chat: {
        isGroup: {
            type: Boolean
        },
        referenceObjId: {
            type: mongoose.Schema.Types.ObjectId
        }
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

/*
{
  "content": "Hey! What's up?",
  "sender": {
    "$oid": "65ec222104fe0c8f1ce4f4b5"
  },
  "chat": {
    "isGroup": true,
    "referenceObjId": {
      "$oid": "65ec3653c733ebd5fb070b3a"
    }
  }
}
*/