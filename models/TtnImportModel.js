const mongoose = require('mongoose');

const Orders = require('./expectedTtnsBaseModel');

module.exports =  Orders.discriminator('import', new mongoose.Schema({},));