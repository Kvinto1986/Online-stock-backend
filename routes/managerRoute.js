const express = require('express');
const ManagerRouter = express.Router();
const { registerDelivery, finishWarehausing } = require("../controlles/managerControlles");

ManagerRouter
.post('/registerDelivery', registerDelivery)
.post('/finishWarehausing', finishWarehausing)


module.exports = ManagerRouter