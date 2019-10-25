const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authorization/passport.middlware');
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {MAIN_ADMIN} = require('../constants/roles');
const {createService, getService} = require('../controllers/servicesControllers');

router.post('', auth.AUTH([MAIN_ADMIN]), createService);
router.get('/:id',serviceAuth.AUTH(), getService);

module.exports = router;