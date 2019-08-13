const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainAdminSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }

});

const MainAdmin = mongoose.model('rootAdmin', MainAdminSchema);

module.exports = MainAdmin;