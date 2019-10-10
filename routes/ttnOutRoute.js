const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE,EMPLOYEE_MANAGER} = require('../constants/roles');
const {createTtn} = require('../controllers/ttnOutController');

router.post('', createTtn);

module.exports = router;