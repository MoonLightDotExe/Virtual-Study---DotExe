const express = require('express')
const groupRouter = express.Router()
const groups = require('../controllers/groups.controllers')

groupRouter.post('/create', groups.create_group)

groupRouter.post('/join', groups.join_group)

groupRouter.post('/remove', groups.remove_user)

module.exports = groupRouter