const mongoose = require('mongoose');
const Orders = require('./expectedTtnsBaseModel');

module.exports = Orders.discriminator('export', new mongoose.Schema({
    deadlineData: {
        type: Date,
        required: true
    },
},));