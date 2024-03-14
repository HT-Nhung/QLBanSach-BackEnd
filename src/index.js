const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routers')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Kết nối DB thành công')
    })
    .catch((err) => {
        console.log(err)
    })
app.listen(port, () => {
    console.log(`Sever is running in port: http://localhost:${port}`)
})