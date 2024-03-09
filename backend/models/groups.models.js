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
        ref: 'User'
    },
    chat: [{
        user: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        },
        text: {
            type: String
        }
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