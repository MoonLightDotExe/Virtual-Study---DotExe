const express = require('express')
const groupRouter = express.Router()
const groups = require('../controllers/groups.controllers')

groupRouter.post('/create', groups.create_group)

groupRouter.post('/join', groups.join_group)

groupRouter.post('/remove', groups.remove_user)

groupRouter.post('/get_my_groups', groups.get_my_groups)

groupRouter.post('/send_attachment', groups.send_attachment)

groupRouter.post('/get_group_messages', groups.get_group_messages)

groupRouter.post('/get_group_resources', groups.get_group_resources)

module.exports = groupRouter