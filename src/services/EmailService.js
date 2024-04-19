const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = ''
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>Bạn đã đặt sách <b>${order.name}</b> với số lượng: <b>${order.amount}</b> với đơn giá là: <b>${order.price}</b></div>
        <div><img src = ${order.image} alt="sản phẩm"/></div>
        </div>`
    })

    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: "dungmama1290@gmail.com", // list of receivers
        subject: "Bạn đã đặt hàng thành công tại shop", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại shop</b></div>${listItem}`, // html body
    });
}

module.exports = {
    sendEmailCreateOrder
}