const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        //isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String },
        address: { type: String },
        avatar: { type: String },
        //city: { type: String },
        role: {//phân quyền, vai trò
            type: String,
            enum: ['AdminSuper', 'Admin', 'Khách hàng'],
            default: 'Khách hàng'
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;