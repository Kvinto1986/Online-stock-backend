const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {COMPANY_ADMIN, EMPLOYEE} = require('../constants/roles');
const {createCarrier, editCarrier, getCarriers, getCarrier, deleteCarrier} = require('../controllers/carrierControllers');

router.post('', auth.AUTH([EMPLOYEE]), createCarrier);
router.post('/:id', auth.AUTH([EMPLOYEE]), editCarrier);
router.get('', auth.AUTH([EMPLOYEE]), getCarriers);
router.get('/:id', auth.AUTH([EMPLOYEE]), getCarrier);
router.delete('/:id', auth.AUTH([EMPLOYEE]), deleteCarrier);

module.exports = router;