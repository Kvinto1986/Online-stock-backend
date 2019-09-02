const mongoose = require('mongoose');

const Users = require('./UsersBaseModel');

module.exports = Users.discriminator('mainAdmin', new mongoose.Schema({},));