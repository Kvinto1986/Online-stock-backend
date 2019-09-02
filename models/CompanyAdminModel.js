const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = require('./UsersBaseModel');

module.exports = Users.discriminator('companyAdmin', new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },

    createDate: {
        type: Date,
        default: Date.now
    },

    deleteDate: {
        type: Date,
    }

},));