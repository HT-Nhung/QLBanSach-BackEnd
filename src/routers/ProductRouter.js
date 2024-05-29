const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)//Xóa
router.get('/get-all', ProductController.getAllProduct)//Hiển thị tất cả dữ liệu
router.get('/get-details/:id', ProductController.getDetailsProduct)//Hiển thị chi tiết sản phẩm
router.post('/delete-many', authMiddleWare, ProductController.deleteMany)// Xóa nhiều sản phẩm
router.get('/get-all-type', ProductController.getAllType)
router.get('/get-product-by-category', ProductController.getAllProductsByCategoryIds)

module.exports = router