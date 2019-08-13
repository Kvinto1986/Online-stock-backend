const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyAdminSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true        
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const CompanyAdmin = mongoose.model('companyAdmin', CompanyAdminSchema);

module.exports = CompanyAdmin;