const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)//Xóa
router.get('/get-all', ProductController.getAllProduct)//Hiển thị dữ liệu
router.get('/get-details/:id', ProductController.getDetailsProduct)//Hiển thị dữ liệu
router.post('/delete-many', authMiddleWare, ProductController.deleteMany)
router.get('/get-all-type', ProductController.getAllType)

module.exports = router