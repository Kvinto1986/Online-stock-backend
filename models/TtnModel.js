const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthScheema = new Schema({
    status: {
        type: String,
        default: 'registred'
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    dataOut: {
        type: Date,
        default: Date.now
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
    report: {
        type: Object,
    },
    description: {
        type: String,
    },
    warehouseID: {
        type: String,
    },
    warehouseAreas: {
        type: Array,
    },
    warehouseCompany: {
        type: String,
        required: true
    },
    service:{
        type: String,
        required: true
    }
});

const tth = mongoose.model('ttn', tthScheema);

module.exports = tth;