const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {COMPANY_ADMIN, EMPLOYEE, EMPLOYEE_MANAGER} = require('../constants/roles');
const {createWarehouse, editWarehouse, getWarehouses, getWarehouse, deleteWarehouse} = require('../controllers/warehouseControllers');

router.post('', auth.AUTH([COMPANY_ADMIN]), createWarehouse);
router.post('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE], [EMPLOYEE_MANAGER]), editWarehouse);
router.get('', auth.AUTH([COMPANY_ADMIN]), getWarehouses);
router.get('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE], [EMPLOYEE_MANAGER]), getWarehouse);
router.delete('/:id', auth.AUTH([COMPANY_ADMIN]), deleteWarehouse);

module.exports = router;