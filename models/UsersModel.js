const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    house: {
        type: Number,
        required: true
    },
    apartment: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        required: true
    },

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
    },

    dateOfBirth: {
        type: Date,
        required: true
    }

});

const User = mongoose.model('users', UserSchema);

module.exports = User;