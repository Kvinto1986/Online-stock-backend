const express = require('express');
const adminRouter = express.Router();
const {getAllAdmins, getAdmin, addAdmin, deleteAdmin, changeAdmin} = require('../controlles/adminControlles');

adminRouter.get('/', getAllAdmins);
adminRouter.get('/:id', getAdmin);
adminRouter.post('/registration', addAdmin);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.put('/:id', changeAdmin);

module.exports = adminRouter;