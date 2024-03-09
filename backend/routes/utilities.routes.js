const express = require('express')
const utilRouter = express.Router()
const utilities = require('../controllers/utilities.controllers')

utilRouter.post('/filterGroup', utilities.filterGroups)

module.exports = utilRouter
