const express = require('express');
const ManagerRouter = express.Router();
const { finishWarehausing } = require("../controllers/managerControllers");

ManagerRouter.post('/finishWarehausing', finishWarehausing);


module.exports = ManagerRouter;