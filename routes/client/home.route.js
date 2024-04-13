const express = require('express')

const router = express.Router()
const controller = require('../../controllers/client/home.controller')


router.get('/', controller.index)
router.get('/login',controller.login)
router.post('/stored',controller.stored)             

module.exports = router;