const express = require('express');
const UsersRoute = express.Router();
const {addUser} = require('../controlles/usersControllers');

UsersRoute.post('/registration', addUser);


module.exports = UsersRoute;