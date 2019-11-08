const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
    }
});

const Service = mongoose.model('services', ServiceSchema);

module.exports = Service;