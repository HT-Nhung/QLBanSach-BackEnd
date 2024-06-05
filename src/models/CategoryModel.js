const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, //Tên thể loại
    description: { type: String },// Mô tả về thể loại
    type: {//Danh mục thể loại
        type: String,
        enum: ['Văn học', 'Kinh tế', 'Đời sống', 'Sách thiếu nhi', 'Hồi ký'],
        default: 'Văn học'
    },
},
    {
        timestamps: true,
    }
);
const Category = mongoose.model('Category', categorySchema);
module.exports = Category