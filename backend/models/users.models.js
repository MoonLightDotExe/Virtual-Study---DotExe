const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    groups: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Group'
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
})

module.exports = mongoose.model('users', userSchema)