const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder
        try {
            //console.log('orderItems', { orderItems })
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate({
                    _id: order.product,
                    countInStock: { $gte: order.amount }
                },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                console.log('productData', productData)
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName, address, city, phone
                        },
                        paymentMethod,
                        itemsPrice, shippingPrice, totalPrice,
                        user: user,
                    })
                    if (createdOrder) {
                        return ({
                            status: 'OK',
                            message: 'Thành công'
                        })
                    }
                } else {
                    return ({
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    })
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Sách với id${newData.join(',')} không đủ`
                })
            }
            resolve({
                status: 'OK',
                message: 'Thành công'
            })
        } catch (e) {
            console.log('e', e)
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'OK',
                    massge: 'Sản phẩm không tồn tại'
                })
            }
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: order
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getOrderDetails
}