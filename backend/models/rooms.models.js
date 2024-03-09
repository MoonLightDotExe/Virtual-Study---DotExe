const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  room_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  preference: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('rooms', roomSchema)
