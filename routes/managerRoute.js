const express = require('express');
const ManagerRouter = express.Router();
const { finishWarehausing } = require('../controllers/managerControllers');
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_MANAGER} = require('../constants/roles');

ManagerRouter.post('/finishWarehausing', auth.AUTH([EMPLOYEE], [EMPLOYEE_MANAGER]), finishWarehausing);

module.exports = ManagerRouter;