const express = require('express');
const router = express.Router();
const auth = require('../middleware/passport.middlware');
const {MAIN_ADMIN} = require('../constants/roles');
const {createCompanyAdmin,getCompanyAdmins,getCompanyAdmin,editCompanyAdmin,deleteCompanyAdmin} = require('../controllers/companyAdminControllers');

router.post('/', auth.AUTH([MAIN_ADMIN]), createCompanyAdmin);
router.get('/', auth.AUTH([MAIN_ADMIN]), getCompanyAdmins);
router.get('/:data', auth.AUTH([MAIN_ADMIN]), getCompanyAdmin);
router.post('/:id', auth.AUTH([MAIN_ADMIN]), editCompanyAdmin);
router.delete('/:id', auth.AUTH([MAIN_ADMIN]), deleteCompanyAdmin);

module.exports = router;