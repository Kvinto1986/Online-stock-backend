const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_OPERATOR} = require('../constants/roles');
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {createOrder, getOrder} = require('../controllers/ttnOrderImportControllers');

router.post('', serviceAuth.AUTH(), createOrder);
router.get('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR]), getOrder);

module.exports = router;