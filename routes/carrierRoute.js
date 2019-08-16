const express = require('express');
const CarrierRouter = express.Router();
const {addCarrier, findCarrier} = require('../controlles/carrierControlles');

//CarrierRouter.get('/', getAllUsers);
CarrierRouter.get('/:id', findCarrier);
CarrierRouter.post('/addUser', addCarrier);
CarrierRouter.delete('/:id', deleteUser);
CarrierRouter.put('/:id', changeUser);

module.exports = CarrierRouter;