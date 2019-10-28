const express = require('express');
const router = express.Router();
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {getWarehouseAddress} = require('../controllers/warehouseAddressControllers');

router.get('/:id',serviceAuth.AUTH(), getWarehouseAddress);

module.exports = router;