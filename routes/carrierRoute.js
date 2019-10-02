const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_OPERATOR} = require('../constants/roles');
const {createCarrier, editCarrier, getCarriers, getCarrier, deleteCarrier} = require('../controllers/carrierControllers');

router.post('', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR]), createCarrier);
router.post('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR]), editCarrier);
router.get('', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR]), getCarriers);
router.get('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR]), getCarrier);
router.delete('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR]), deleteCarrier);

module.exports = router;