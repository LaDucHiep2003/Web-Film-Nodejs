const express = require('express')

const router = express.Router()
const controller = require('../../controllers/admin/product-category.controller')
const multer  = require('multer')
const upload = multer()
const validate = require('../../validates/admin/product.validate')

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controller.index) 
router.get('/create', controller.create) 
router.post("/create",upload.single('image'),uploadCloud.upload,validate.createPost,controller.createPost)
router.delete('/delete/:id', controller.delete) 
router.get('/edit/:id', controller.edit) 

module.exports = router;