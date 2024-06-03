const express = require("express");
const router = express.Router()
const PublisherController = require('../controllers/PublisherController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', PublisherController.createPublisher)//Thêm mới nhà xuất bản
router.put('/update/:id', authMiddleWare, PublisherController.updatePublisher)//cập nhật nhà xuất bản

router.get('/get-publishers', PublisherController.getAllPublisher)//Hiển thị danh sách nhà xuấ bản
router.get('/get-details/:id', PublisherController.getDetailsPublisher)//Hiển thị chi tiết nhà xuất bản

router.delete('/delete/:id', authMiddleWare, PublisherController.deletePublisher)//Xóa
router.post('/delete-many', authMiddleWare, PublisherController.deleteMany)// Xóa nhiều
router.get('/get-by-id', PublisherController.fetchPublishers)//Tìm nhà xuất bản của sản phẩm

module.exports = router