const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu không hợp lệ'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Mã sản phẩm là bắt buộc'
            })
        }
        const response = await OrderService.getOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        // const data = req.body.orderItems
        const orderId = req.params.id
        const data = req.body.orderItems
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const { newStatus } = req.body;
        if (!orderId || !newStatus) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu id đơn hàng và trạng thái'
            })
        }
        const response = await OrderService.updateOrderStatus(orderId, newStatus);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng'
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Id là bắt buộc'
            })
        }
        const response = await OrderService.deleteManyOrder(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getDetailsOrder,
    getAllOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    updateOrder,
    deleteMany
}