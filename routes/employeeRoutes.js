const express = require('express');
const router = express.Router();
const auth = require('../middleware/passport.middlware');
const {COMPANY_ADMIN, EMPLOYEE} = require('../constants/roles');
const {createEmployee, editEmployee, getEmployees, getEmployee, deleteEmployee} = require('../controllers/employeeControllers');

router.post('', auth.AUTH([COMPANY_ADMIN]), createEmployee);
router.post('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE]), editEmployee);
router.get('', auth.AUTH([COMPANY_ADMIN]), getEmployees);
router.get('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE]), getEmployee);
router.delete('/:id', auth.AUTH([COMPANY_ADMIN]), deleteEmployee);

module.exports = router;