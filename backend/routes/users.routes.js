const express = require('express')
const userRouter = express.Router()
const users = require('../controllers/users.controllers')

userRouter.post('/register', users.register)

userRouter.post('/login', users.login)

module.exports = userRouter