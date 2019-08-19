const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyAdminSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    createDate: {
        type: Date,
        default: Date.now
    },

    deleteDate: {
        type: Date,
    }

});

const CompanyAdminModel = mongoose.model('companyAdmin', CompanyAdminSchema);

module.exports = CompanyAdminModel;