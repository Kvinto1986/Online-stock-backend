const mongoose = require('mongoose');
const options = require('./modelOptions');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    company: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, options);

module.exports = mongoose.model('Users', userSchema);