const express = require('express')

const router = express.Router()
const controller = require('../../controllers/admin/product.controller')
const multer  = require('multer')
const upload = multer()
const validate = require('../../validates/admin/product.validate')

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controller.index) 
router.patch('/change-multi',controller.changeMulti)
router.delete('/delete/:id',controller.deleteItem)
router.get('/create',controller.create)
router.post("/create",upload.single('image'),uploadCloud.upload,validate.createPost,controller.createPost)
router.get('/edit/:id',controller.edit)
router.patch("/edit/:id",upload.single('image'),uploadCloud.upload,validate.createPost,controller.editPatch)
router.get('/deleted', controller.deleted) 
router.patch('/stored/:id', controller.stored) 
router.delete('/permanently/:id',controller.deleteItemPermanently)

router.get('/newEpisode/:id', controller.newEpisode) 
router.patch('/newEpisode/:id', controller.newEpisodePatch) 


module.exports = router;