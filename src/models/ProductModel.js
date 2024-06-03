const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        productCode: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        author: { type: String },//Tác giả
        publishId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' }],//Id Nhà xuất bản
        publishYear: { type: Number },//Năm xuất bản
        episode: { type: String },//Tập
        images: { type: [String], required: true },
        categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],//Thể loại
        price: { type: Number, required: true },//giá
        countInStock: { type: Number, required: true }, // số lượng kho
        averageRating: { type: Number, default: 0 }, // Đánh giá trung bình sao
        ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }], // Danh sách đánh giá
        description: { type: String }, //mô tả
        discount: { type: Number }, //giảm giá
        selled: { type: Number } //số lượng sách đã bán
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;