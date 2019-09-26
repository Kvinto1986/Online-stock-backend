const express = require('express');
const ManagerRouter = express.Router();
const { finishWarehausing } = require("../controlles/managerControlles");

ManagerRouter.post('/finishWarehausing', finishWarehausing);


module.exports = ManagerRouter;