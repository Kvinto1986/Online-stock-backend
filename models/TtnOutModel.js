const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthOutScheema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    dataOfRegistration: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: String,
        required: true
    },
    carrier: {
        type: Object,
        required: true
    },
    registrar: {
        type: Object,
        required: true
    },
    driver: {
        type: Object,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    description: {
        type: String,
    },
    warehouseLicense: {
        type: String,
        required: true
    },
    warehouseCompany: {
        type: String,
        required: true
    },
});

const tthOut = mongoose.model('ttnOut', tthOutScheema);

module.exports = tthOut;