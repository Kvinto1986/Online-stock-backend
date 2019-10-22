const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER} = require('../constants/roles');
const {createDriver, getDriver} = require("../controllers/driversConrollers");

router.post('/', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), createDriver);
router.get('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), getDriver);

module.exports = router;