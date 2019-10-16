const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_OPERATOR, EMPLOYEE_CONTROLLER, EMPLOYEE_MANAGER} = require('../constants/roles');
const {createTtn} = require('../controllers/ttnOutController');

router.post('',auth.AUTH([EMPLOYEE], [EMPLOYEE_MANAGER]), createTtn);

module.exports = router;