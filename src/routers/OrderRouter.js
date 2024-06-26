const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', authUserMiddleWare, OrderController.createOrder)
router.get('/get-all-order/:id', authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', authUserMiddleWare, OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', authUserMiddleWare, OrderController.cancelOrderDetails)
router.get('/get-all-order', OrderController.getAllOrder)
router.put('/update-status/:id', authUserMiddleWare, OrderController.updateOrder)
router.post('/delete-many', authMiddleWare, OrderController.deleteMany)
router.get('/get-statistic', OrderController.getRevenueForLast10Days)
router.get('/get-statistic-product', OrderController.getTopSellingProducts)

module.exports = router