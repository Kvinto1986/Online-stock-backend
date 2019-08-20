const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrierSchema = new Schema({
    passportNumber: {
        type: Number,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    tel: {
        type: Number,
        required: true
    },
    company: {
        type: String,
    }


});

const Carrier = mongoose.model('carrier', CarrierSchema);

module.exports = Carrier;