const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.delete('/delete/:id', ProductController.deleteProduct)//Xóa
router.get('/get-all', ProductController.getAllProduct)//Hiển thị dữ liệu
router.get('/get-details/:id', ProductController.getDetailsProduct)//Hiển thị dữ liệu
// router.post('/refresh-token', userController.refreshToken)


module.exports = router