const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrierSchema = new Schema({
    email: {
        type: String
    },
    tel: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    }


});

const Carrier = mongoose.model('carrier', CarrierSchema);

module.exports = Carrier;