const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    starRating: { type: Number, required: true, min: 1, max: 5 }, // Số sao đánh giá
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Sản phẩm được đánh giá
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người đánh giá
    comment: { type: String }, // Nội dung nhận xét
},
    {
        timestamps: true,
    }
);
const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating