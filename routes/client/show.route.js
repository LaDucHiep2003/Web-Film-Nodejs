const express = require('express')

const router = express.Router()
const controller = require('../../controllers/client/show.controller')
const middleWare = require("../../middlewares/client/login.middleware")

router.get('/:slug',middleWare.requireAuth, controller.show) 
router.get('/:slug/:newEp',middleWare.requireAuth, controller.watch)  
router.post('/comment/:movieId',middleWare.requireAuth, controller.comments) 

module.exports = router;