const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {MAIN_ADMIN, EMPLOYEE, EMPLOYEE_MANAGER, EMPLOYEE_OPERATOR} = require('../constants/roles');
const {createService, getServices, deleteService} = require('../controllers/servicesControllers');

router.post('', auth.AUTH([MAIN_ADMIN]), createService);
router.get('', auth.AUTH([EMPLOYEE], [EMPLOYEE_MANAGER, EMPLOYEE_OPERATOR]), getServices);
router.delete('/:id', auth.AUTH([MAIN_ADMIN]), deleteService);

module.exports = router;