const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String
    },
    admin: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    coordinators: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    },
    chat: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message'
    }],
    resources: [{
        name: {
            type: String
        },
        link: {
            type: String
        }
    }]
})

module.exports = mongoose.model('groups', groupSchema)