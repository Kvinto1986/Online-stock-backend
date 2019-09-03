const express = require('express');
const WarehousesRoute = express.Router();

const Warehouse = require('../models/WarehouseModel');
const {addWarehouse,deleteWarehouse} = require('../controlles/warehouseControllers');
const passport = require('passport');
require('../passport')(passport)


WarehousesRoute.post('/registration', addWarehouse);
WarehousesRoute.post('/delete', deleteWarehouse);
WarehousesRoute.get('/getAll')

//WarehousesRoute.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
///
   // return  Warehouse.find({})
   //     .then(warehouse => {
   //         res.json(warehouse)
  //      });
//});

module.exports = WarehousesRoute;