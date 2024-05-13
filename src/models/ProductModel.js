const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true }, // thể loại
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true }, // số lượng kho
        rating: { type: Number, required: true }, //đánh giá sao
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