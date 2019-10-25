const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
});

const Service = mongoose.model('services', ServiceSchema);

module.exports = Service;