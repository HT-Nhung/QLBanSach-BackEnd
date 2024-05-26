const Product = require("../models/ProductModel");
const Rating = require("../models/RatingModel")

const createRating = async (newRatingData) => {
    try {
        // Kiểm tra nếu user đã đánh giá sản phẩm này chưa
        const existingRating = await Rating.findOne({ productId: newRatingData.productId, userId: newRatingData.userId });
        if (existingRating) {
            return {
                status: '1',
                message: 'Bạn đã đánh giá sản phẩm này rồi'
            };
        }

        // Tạo đánh giá mới
        const newRating = new Rating(newRatingData);
        await newRating.save();

        // Cập nhật sản phẩm với đánh giá mới
        const product = await Product.findById(newRatingData.productId);
        product.ratings.push(newRating._id);

        // Lấy tất cả các đánh giá của sản phẩm
        const ratings = await Rating.find({ productId: newRatingData.productId });

        // Tính toán đánh giá trung bình mới
        const totalStars = ratings.reduce((sum, rating) => sum + rating.starRating, 0);
        const averageRating = totalStars / ratings.length;
        product.averageRating = averageRating;

        await product.save();

        return {
            status: 'OK',
            message: 'Đánh giá thành công',
            rating: newRating
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: error.message
        };
    }
};

const updateRating = async (ratingId, updatedRatingData) => {
    try {
        // Tìm đánh giá cần cập nhật
        const rating = await Rating.findById(ratingId);
        if (!rating) {
            return {
                status: '1',
                message: 'Không tìm thấy đánh giá'
            };
        }

        // Cập nhật thông tin đánh giá
        rating.starRating = updatedRatingData.starRating || rating.starRating;
        rating.comment = updatedRatingData.comment || rating.comment;

        await rating.save();

        // Cập nhật đánh giá trung bình của sản phẩm
        const product = await Product.findById(rating.productId);
        if (!product) {
            return {
                status: '2',
                message: 'Không tìm thấy sản phẩm'
            };
        }

        // Lấy tất cả các đánh giá của sản phẩm
        const ratings = await Rating.find({ productId: rating.productId });

        // Tính toán đánh giá trung bình mới
        const totalStars = ratings.reduce((sum, rating) => sum + rating.starRating, 0);
        const averageRating = totalStars / ratings.length;
        product.averageRating = averageRating;

        await product.save();

        return {
            status: 'OK',
            message: 'Cập nhật đánh giá thành công',
            rating
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: error.message
        };
    }
};


const getRatingByUserIdAndProductId = async (userId, productId) => {
    try {
        // Tìm đánh giá dựa trên userId và productId
        const rating = await Rating.findOne({ userId, productId });

        if (!rating) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy đánh giá của bạn cho sản phẩm này'
            };
        }

        return {
            status: 'OK',
            message: 'Đã tìm thấy đánh giá',
            rating
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: error.message
        };
    }
};

const fetchRatings = async (ratingIds) => {
    try {
        const ratings = await Rating.find({ _id: { $in: ratingIds } }).populate('userId'); // Sử dụng populate để lấy thông tin về người dùng liên quan đến đánh giá
        return {
            status: 'OK',
            message: 'Đã tìm thấy đánh giá',
            ratings
        };
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

module.exports = {
    createRating,
    updateRating,
    getRatingByUserIdAndProductId,
    fetchRatings
};