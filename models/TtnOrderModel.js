const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tthOrderSchema = new Schema({
    dataOfRegistration: {
        type: Date,
        default: Date.now
    },
    number: {
        type: String,
        required: true
    },
    cargo: {
        type: Array,
        required: true
    },
    deadlineData: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
});

const tthOrder = mongoose.model('tthOrder', tthOrderSchema);

module.exports = tthOrder;