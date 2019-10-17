const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {EMPLOYEE, EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER} = require('../constants/roles');
const {createCarrier, editCarrier, getCarriers, getCarrier, deleteCarrier} = require('../controllers/carrierControllers');

router.post('', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), createCarrier);
router.post('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), editCarrier);
router.get('', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), getCarriers);
router.get('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), getCarrier);
router.delete('/:id', auth.AUTH([EMPLOYEE], [EMPLOYEE_OPERATOR, EMPLOYEE_MANAGER]), deleteCarrier);

module.exports = router;