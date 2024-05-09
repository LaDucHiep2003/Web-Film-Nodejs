const express = require('express')

const router = express.Router()
const controller = require('../../controllers/client/home.controller')


router.get('/', controller.index)
router.get('/login',controller.login)
router.post('/success',controller.success) 
router.post('/stored',controller.stored)  
router.get('/logout',controller.logout) 
router.get('/:slugCategory',controller.category)          

module.exports = router;