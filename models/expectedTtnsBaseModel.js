const mongoose = require('mongoose');
const options = require('./expectedTtnsModelOptions');

const orderSchema = new mongoose.Schema({
    dataOfRegistration: {
        type: Date,
        default: Date.now
    },
    number: {
        type: String,
        required: true
    },
    warehouseLicense: {
        type: String,
        required: true
    },
    cargo: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    carNumber: {
        type: String,
        required: true
    },
}, options);

module.exports = mongoose.model('Orders', orderSchema);