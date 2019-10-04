const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrierSchema = new Schema({
    unp: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
});

const Carrier = mongoose.model('carrier', CarrierSchema);

module.exports = Carrier;