const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE,EMPLOYEE_OPERATOR} = require('../constants/roles');
const{createDriver, getDriver} = require("../controllers/driversConrollers");

router.post('/', auth.AUTH([EMPLOYEE],[EMPLOYEE_OPERATOR]), createDriver);
router.get('/:id', auth.AUTH([EMPLOYEE],[EMPLOYEE_OPERATOR]), getDriver);

module.exports = router;