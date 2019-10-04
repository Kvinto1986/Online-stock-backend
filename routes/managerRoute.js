const express = require('express');
const ManagerRouter = express.Router();
const { finishWarehausing, validateWarehousing } = require('../controllers/managerControllers');

ManagerRouter.post('/finishWarehausing', validateWarehousing, finishWarehausing);

module.exports = ManagerRouter;