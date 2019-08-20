const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthScheema = new Schema({
    number: {
        type: Number,
        required: true
    },
    // dataOut: {
    //     type: Date,
    //     default: Date.now
    // },
    dataOfRegistration: {
        type: Date,
        default: Date.now
    },
    carrier: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    registrar: {
        type: String,
        required: true
    }

});

const tth = mongoose.model('tth', tthScheema);

module.exports = tth;