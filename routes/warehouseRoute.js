const express = require('express');
const WarehousesRoute = express.Router();
const {addWarehouse,getWarehousesList,deleteWarehouse} = require('../controlles/warehouseControllers');

WarehousesRoute.post('/registration', addWarehouse);
WarehousesRoute.post('/getList', getWarehousesList);
WarehousesRoute.post('/delete', deleteWarehouse);

module.exports = WarehousesRoute;