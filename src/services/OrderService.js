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
            const allOrder = await Order.find().sort({ createdAt: -1 })
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

const updateOrderStatus = async (id, newStatus, isPaid) => {
    try {
        const order = await Order.findByIdAndUpdate(id, { isDelivered: newStatus, isPaid: isPaid }, { new: true });
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

// Doanh số bán hàng của các ngày từ 10 ngày gần nhất, lấy theo khoảng thời gian nếu có
const getRevenueForLast10Days = (startDate, endDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let matchCondition = {};

            // Kiểm tra nếu có tham số startDate và endDate được truyền vào
            if (startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                matchCondition = {
                    $match: {
                        createdAt: { $gte: start, $lte: end },
                        isPaid: true
                    }
                };
            } else {
                // Nếu không, lấy 10 ngày gần nhất
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                matchCondition = {
                    $match: {
                        createdAt: { $gte: tenDaysAgo },
                        isPaid: true
                    }
                };
            }

            const revenueLast10Days = await Order.aggregate([
                matchCondition,
                {
                    $group: {
                        _id: {
                            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                            orderId: "$_id" // Phân biệt các đơn hàng
                        },
                        totalRevenue: { $sum: "$totalPrice" } // Tính tổng doanh thu của mỗi đơn hàng
                    }
                },
                {
                    $group: {
                        _id: "$_id.date", // Nhóm lại theo ngày
                        totalRevenue: { $sum: "$totalRevenue" }, // Tính tổng doanh thu của mỗi ngày
                        totalOrders: { $sum: 1 } // Đếm số đơn hàng trong mỗi ngày
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);

            // Tính tổng doanh thu của tất cả các ngày
            const totalRevenueAllDays = revenueLast10Days.reduce((total, day) => total + day.totalRevenue, 0);

            if (revenueLast10Days.length === 0) {
                resolve({
                    status: 'OK',
                    message: 'Không có đơn hàng nào trong khoảng thời gian này',
                    data: [],
                    totalRevenueAllDays: 0
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Thống kê doanh số bán hàng thành công',
                    data: revenueLast10Days,
                    totalRevenueAllDays: totalRevenueAllDays
                });
            }
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Đã xảy ra lỗi khi thống kê doanh số',
                error: e.message
            });
        }
    });
}


// Hiển thị 10 sản phẩm bán chạy nhất, lấy các sản phẩm bán chạy theo khoảng thời gian nếu có
const getTopSellingProducts = (startDate, endDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let matchCondition = {};

            // Kiểm tra nếu có tham số startDate và endDate được truyền vào
            if (startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                matchCondition = {
                    createdAt: { $gte: start, $lte: end },
                    isPaid: true
                };
            }

            const topProducts = await Order.aggregate([
                { $match: matchCondition },
                { $unwind: "$orderItems" },
                {
                    $group: {
                        _id: "$orderItems.product",
                        totalSold: { $sum: "$orderItems.amount" }
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "_id",
                        as: "productDetails"
                    }
                },
                {
                    $unwind: "$productDetails"
                },
                {
                    $project: {
                        productId: "$_id",
                        productName: "$productDetails.name",
                        totalSold: 1
                    }
                },
                {
                    $sort: { totalSold: -1 }
                },
                {
                    $limit: 10
                }
            ]);

            resolve({
                status: 'OK',
                message: 'Thống kê 10 sản phẩm bán chạy nhất thành công',
                data: topProducts
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Đã xảy ra lỗi khi thống kê 10 sản phẩm bán chạy nhất',
                error: e.message
            });
        }
    });
}

module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    updateOrderStatus,
    deleteManyOrder,
    getRevenueForLast10Days,
    getTopSellingProducts,
}