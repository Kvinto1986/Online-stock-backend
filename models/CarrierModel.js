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
        type: String
    },
    tel: {
        type: String,
        required: true
    },
    company: {
        type: String,
    },
    isDisabled: false
});

const Carrier = mongoose.model('carrier', CarrierSchema);

module.exports = Carrier;