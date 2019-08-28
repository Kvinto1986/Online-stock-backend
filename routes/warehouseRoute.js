const express = require('express');
const WarehousesRoute = express.Router();
const {addWarehouse} = require('../controlles/warehouseControllers');

WarehousesRoute.post('/registration', addWarehouse);


module.exports = WarehousesRoute;