const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/sign-up', userController.createUser)//Tạo tài khoản
router.post('/sign-in', userController.loginUser)//Đăng nhập
router.post('/log-out', userController.logoutUser)//Đăng xuất
router.put('/update-user/:id', authUserMiddleWare, userController.updateUser)//Cập nhật
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)//Xóa
router.get('/getAll', authMiddleWare, userController.getAllUser)//Hiển thị dữ liệu
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser)//Hiển thị dữ liệu
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many', authMiddleWare, userController.deleteMany)

module.exports = router