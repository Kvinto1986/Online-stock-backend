const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_MANAGER} = require('../constants/roles');
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {createOrder, getOrder} = require('../controllers/ttnOrderExportControllers');

router.post('', serviceAuth.AUTH(), createOrder);
router.get('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_MANAGER]), getOrder);

module.exports = router;