const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const PaymentRouter = require('./PaymentRouter')
const RatingRouter = require('./RatingRouter')
const CategoryRouter = require('./CategoryRouter')
const PublisherRouter = require('./PulisherRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/payment', PaymentRouter)
    app.use('/api/rating', RatingRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/publisher', PublisherRouter)
}

module.exports = routes