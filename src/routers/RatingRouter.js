const express = require("express");
const router = express.Router()
const ratingController = require('../controllers/RatingController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/create-rating', authUserMiddleWare, ratingController.createRating)//tạo đánh giá
router.put('/update-rating', authUserMiddleWare, ratingController.updateRating)//cập nhật đánh giá
router.get('/get-rating-by-user', ratingController.getRatingByUserIdAndProductId)//Tìm đánh giá của user với sản phẩm nào đó
router.get('/get-ratings', ratingController.fetchRatings)//Tìm đánh giá của sản phẩm

module.exports = router