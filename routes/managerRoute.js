const express = require('express');
const ManagerRouter = express.Router();
const {registerDelivery} = require("../controlles/managerControlles");

ManagerRouter.post('/registerDelivery', registerDelivery);

module.exports = ManagerRouter