const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {COMPANY_ADMIN, EMPLOYEE} = require('../constants/roles');
const {createTTN,getTTN,editTTN} = require('../controllers/ttnControllers');

router.post('', auth.AUTH([COMPANY_ADMIN,EMPLOYEE]), createTTN);
router.post('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE]), editTTN);
router.get('/:id', auth.AUTH([COMPANY_ADMIN, EMPLOYEE]), getTTN);

module.exports = router;