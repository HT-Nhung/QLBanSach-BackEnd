const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true }, // tên sách 
            amount: { type: Number, required: true }, // số lượng
            image: { type: String, required: true },
            price: { type: Number, required: true }, // giá
            discount: { type: Number }, // giảm giá
            product: { // lấy id của sản phẩm từ bảng Product
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: { // Thông tin địa chỉ giao hàng
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true }, //Hình thức thanh toán
    itemsPrice: { type: Number, required: true }, //giá sản phẩm
    shippingPrice: { type: Number, required: true }, // giá ship
    totalPrice: { type: Number, required: true }, //Tông giá
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //Lấy thông tin người mua từ bảng user
    isPaid: { type: Boolean, default: false }, //Trạng thái thanh toán
    paidAt: { type: Date }, //Thời thanh toán
    isDelivered: { type: Boolean, default: false }, //Trạng thái đơn hàng
    deliveredAt: { type: Date },// thời gian đặt hàng
},
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order