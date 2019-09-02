const express = require('express');
const WarehousesRoute = express.Router();
const {addWarehouse,getWarehousesList,deleteWarehouse, getAllWarehouses} = require('../controlles/warehouseControllers');

WarehousesRoute.post('/registration', addWarehouse);
WarehousesRoute.post('/getList', getWarehousesList);
WarehousesRoute.post('/delete', deleteWarehouse);
WarehousesRoute.get('/getAll', getAllWarehouses)

module.exports = WarehousesRoute;