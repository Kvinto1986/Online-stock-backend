const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthOutSchema = new Schema({
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
        type: String
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

});

const tthOut = mongoose.model('ttnOut', tthOutSchema);

module.exports = tthOut;