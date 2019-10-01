const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {COMPANY_ADMIN, EMPLOYEE} = require('../constants/roles');
const{createDriver, getDriver} = require("../controllers/driversConrollers");

router.post('/', auth.AUTH([COMPANY_ADMIN, EMPLOYEE]), createDriver);
router.get('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE]), getDriver);

module.exports = router;