const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthScheema = new Schema({
    status: {
        type: String,
        default: 'registred'
    },
    number: {
        type: String,
        required: true
    },
    dataOut: {
        type: Date,
        default: Date.now
    },
    dataOfRegistration: {
        type: Date,
        required: true
    },
    sender: {
      type: String,
      required: true
    },
    carrier: {
        type: String,
        required: true
    },
    registrar: {
        type: String,
        required: true
    },
    driver: {
        type: String,
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
});

const tth = mongoose.model('ttn', tthScheema);

module.exports = tth;