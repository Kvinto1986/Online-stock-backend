const mongoose = require('mongoose');
const Users = require('./UsersBaseModel');

module.exports = Users.discriminator('employee', new mongoose.Schema({
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
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    position:{
        type: Array,
        required: true
    },
    avatar:{
        type:String,
    },
},));


