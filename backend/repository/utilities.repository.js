const dotenv = require('dotenv').config()
const users = require('../models/users.models')
const groups = require('../models/groups.models')
const rooms = require('../models/rooms.models')

const self = (module.exports = {
  filterGroups: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { val, user_id } = body
        console.log(val + ' ' + user_id)
        let names = []
        if (val == 3) {
          console.log(val + ' ' + user_id)
          const user = await users.findOne({ _id: user_id })
          console.log(user)
          user.groups.map(async (v) => {
            console.log(v.toString())
            const group = await groups.findOne({ _id: v.toString() })
            console.log(group.name)
            names.push(group.name)
          })
          setTimeout(() => {
            console.log(names)
            resolve(names)
          }, 3000)
        }
      } catch (err) {
        reject(err)
      }
    })
  },
  addRoom: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { user_id, room_id, preference, interest } = body
        const room = await rooms.create({
          user_id,
          room_id,
          preference,
          interest,
        })
        await room.save()
        resolve(room)
      } catch (err) {
        reject(err)
      }
    })
  },
})
