const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    oroderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true,
            },
        },
    ],
    shippingAddress: {
        fullname: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    PaymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAT: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliverdAt: { type: Date },
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order