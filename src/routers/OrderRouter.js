const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', authMiddleWare, OrderController.createOrder)

module.exports = router