const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = require('./UsersBaseModel');
const CompanyAdminSchema = new mongoose.Schema({
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

});
module.exports = Users.discriminator('companyAdmin', CompanyAdminSchema);