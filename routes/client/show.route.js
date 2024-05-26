const express = require('express')

const router = express.Router()
const controller = require('../../controllers/client/show.controller')

router.get('/:slug', controller.show) 
router.get('/:slug/:newEp', controller.watch)  
           

module.exports = router;