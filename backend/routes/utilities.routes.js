const express = require('express')
const utilRouter = express.Router()
const utilities = require('../controllers/utilities.controllers')

utilRouter.post('/filterGroup', utilities.filterGroups)

utilRouter.post('/addRoom', utilities.addRoom)

module.exports = utilRouter
