const express = require('express');
const WarehousesRoute = express.Router();
const {addWarehouse,deleteWarehouse, getAllWarehouses} = require('../controlles/warehouseControllers');
const passport = require('passport');
require('../passport')(passport)

WarehousesRoute.post('/registration', addWarehouse);
WarehousesRoute.post('/delete', deleteWarehouse);
WarehousesRoute.get('/getAll', getAllWarehouses)

//WarehousesRoute.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
///
   // return  Warehouse.find({})
   //     .then(warehouse => {
   //         res.json(warehouse)
  //      });
//});

module.exports = WarehousesRoute;