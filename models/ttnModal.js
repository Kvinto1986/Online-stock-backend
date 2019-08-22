const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthScheema = new Schema({
    number: {
        type: Number,
        required: true
    },
    dataOut: {
        type: Date,
        default: Date.now
    },
    sender: {
      type: String,
      required: true
    },
    carNumber: {
        type: String,
        required: true
    },

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
        default: 'registred'
    },
    driver: {
        type: String,
        required: true
    },
    registrar: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productsAmout: {
        type: Number,
        required: true
    },
    namesAmout: {
        type: Number,
        required: true
    }

});

const tth = mongoose.model('ttn', tthScheema);

module.exports = tth;