const express = require('express');
const UserRouter = express.Router();
const {getAllUsers, getUser, addUser, deleteUser, changeUser} = require('../controlles/usersControles');

UserRouter.get('/', getAllUsers);
UserRouter.get('/:id', getUser);
UserRouter.post('/addUser', addUser);
UserRouter.delete('/:id', deleteUser);
UserRouter.put('/:id', changeUser);

module.exports = UserRouter;