const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]
    // Xác minh tính dối xứng của mã thông báo
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'Lỗi xác thực',
                status: "ERR"
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'Xác thực',
                status: "ERR"
            })
        }
    });

}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]
    const userId = req.params.id ? req.params.id : req.body.user
    const userId1 = req.body.user
    // Xác minh tính dối xứng của mã thông báo
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'Lỗi xác thực',
                status: "ERR"
            })
        }
        next()
    });

}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}