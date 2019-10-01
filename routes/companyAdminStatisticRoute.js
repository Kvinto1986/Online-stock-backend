const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const {MAIN_ADMIN} = require('../constants/roles');
const {getStatistic} = require('../controllers/companyAdminStatisticController');

router.post('/', auth.AUTH([MAIN_ADMIN]), getStatistic);

module.exports = router;