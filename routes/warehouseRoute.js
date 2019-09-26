const express = require('express');
const WarehousesRoute = express.Router();
const Warehouse = require('../models/WarehouseModel');
const {addWarehouse,deleteWarehouse, getAllWarehouses} = require('../controlles/warehouseControllers');

WarehousesRoute.post('/registration', addWarehouse);
WarehousesRoute.post('/delete', deleteWarehouse);
WarehousesRoute.get('/', getAllWarehouses)

module.exports = WarehousesRoute;