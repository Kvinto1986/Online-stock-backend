const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    fathename: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        build: {
            type: Number,
            required: true
        },
        flat: {
            type: number,
            required: true
        },
    },
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

const User = mongoose.model('users', UserSchema);

module.exports = User;