const express = require('express');
const router = express.Router();
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {getwarehouseToSideService} = require('../controllers/warehouseToSideService');

router.get('/:id', serviceAuth.SIDEAUTH(), getwarehouseToSideService);

module.exports = router;