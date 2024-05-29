const express = require("express");
const router = express.Router()
const categoryController = require('../controllers/CategoryController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-category', categoryController.createCategory)//Thêm mới thể loại
router.put('/update/:id', authMiddleWare, categoryController.updateCategory)//cập nhật thể loại

router.get('/get-categories', categoryController.getAllCategoy)//Hiển thị danh sách thể loại
router.get('/get-details/:id', categoryController.getDetailsCategory)//Hiển thị chi tiết thể loại

router.delete('/delete/:id', authMiddleWare, categoryController.deleteCategory)//Xóa
router.post('/delete-many', authMiddleWare, categoryController.deleteMany)// Xóa nhiều
router.get('/get-by-type', categoryController.getCategoryByType)// tìm thể thoại theo danh mục

module.exports = router