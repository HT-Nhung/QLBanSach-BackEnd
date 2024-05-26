const RatingService = require('../services/RatingService')
const JwtService = require('../services/JwtService')

const createRating = async (req, res) => {
    try {
        const { starRating, productId, userId, comment } = req.body;
        if (!starRating || !productId || !userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu không hợp lệ'
            })
        }
        const response = await RatingService.createRating(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateRating = async (req, res) => {
    try {
        const { ratingId } = req.body;

        // Kiểm tra xem ratingId và dữ liệu cập nhật có tồn tại không
        if (!ratingId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu thông tin ratingId hoặc dữ liệu cập nhật'
            });
        }

        // Gọi service để cập nhật đánh giá
        const response = await RatingService.updateRating(ratingId, req.body);

        // Trả về kết quả từ service
        return res.status(200).json(response);
    } catch (error) {
        // Bắt lỗi và trả về thông báo lỗi
        return res.status(500).json({
            message: error.message
        });
    }
};

const getRatingByUserIdAndProductId = async (req, res) => {
    try {
        const { userId, productId } = req.query;

        // Kiểm tra xem userId và dữ liệu cập nhật có tồn tại không
        if (!userId || !productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu thông tin userId hoặc productId'
            });
        }
        // Gọi service để cập nhật đánh giá
        const response = await RatingService.getRatingByUserIdAndProductId(userId, productId);

        // Trả về kết quả từ service
        return res.status(200).json(response);
    } catch (error) {
        // Bắt lỗi và trả về thông báo lỗi
        return res.status(500).json({
            message: error.message
        });
    }
};

const fetchRatings = async (req, res) => {
    try {
        const ratingIds = req.query.ratingIds;
        if (!ratingIds || !Array.isArray(ratingIds)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu hoặc sai định dạng ratingIds'
            });
        }

        // Gọi service để lấy đánh giá
        const response = await RatingService.fetchRatings(ratingIds);

        // Trả về kết quả từ service
        return res.status(200).json(response);
    } catch (error) {
        // Bắt lỗi và trả về thông báo lỗi cụ thể
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy đánh giá: ' + error.message
        });
    }
};

module.exports = {
    createRating,
    updateRating,
    getRatingByUserIdAndProductId,
    fetchRatings
}