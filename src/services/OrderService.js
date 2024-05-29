const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice,
            fullName, address, phone, user, isPaid, paidAt, email } = newOrder
        try {
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
                if (productData) {
                    return {
                        status: 'OK',
                        message: 'Thành công'
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
            const newData = results && results.filter((item) => item.id || null)
            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'ERR',
                    message: `Sách với id: ${newData.join(',')} không đủ`
                })
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName, address, phone
                    },
                    paymentMethod,
                    itemsPrice, shippingPrice, totalPrice,
                    user: user,
                    isPaid, paidAt
                })
                if (createdOrder) {
                    try {
                        //await EmailService.sendEmailCreateOrder(email, orderItems);
                        resolve({
                            status: 'OK',
                            message: 'Thành công'
                        });
                    } catch (emailError) {
                        // Xử lý ngoại lệ gửi email nhưng đơn hàng vẫn được tạo
                        resolve({
                            status: 'OK',
                            message: 'Thành công nhưng không gửi được email'
                        });
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
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

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find()
            resolve({
                status: 'OK',
                message: 'Hiển thị dữ liệu thành công',
                data: allOrder
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updateOrderStatus = async (id, newStatus) => {
    try {
        const order = await Order.findByIdAndUpdate(id, { isDelivered: newStatus }, { new: true });
        if (!order) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy đơn hàng'
            };
        }
        return {
            status: 'OK',
            message: 'Thay đổi trạng thái đơn hàng thành công',
            data: order
        };
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng');
    }
};
const deleteManyOrder = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Order.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa dữ liệu thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
    deleteManyOrder
}