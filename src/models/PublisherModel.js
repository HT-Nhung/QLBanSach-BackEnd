const mongoose = require('mongoose')

const publisherSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
},
    {
        timestamps: true,
    }
);
const Publisher = mongoose.model('Publisher', publisherSchema);
module.exports = Publisher