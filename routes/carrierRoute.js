const express = require('express');
const CarrierRouter = express.Router();
const {addCarrier, findCarrier} = require('../controlles/carrierControlles');

//CarrierRouter.get('/', getAllUsers);
CarrierRouter.get('/:company', findCarrier);
CarrierRouter.post('/addCarrier', addCarrier);
// CarrierRouter.delete('/:id', deleteUser);
// CarrierRouter.put('/:id', changeUser);

module.exports = CarrierRouter;