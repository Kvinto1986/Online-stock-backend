const express = require('express');
const CarrierRouter = express.Router();
const {addCarrier, findCarrier, getAllCarriers} = require('../controlles/carrierControlles');

CarrierRouter.get('/', getAllCarriers);
CarrierRouter.get('/:company', findCarrier);
CarrierRouter.post('/addCarrier', addCarrier);
// CarrierRouter.delete('/:id', deleteUser);
// CarrierRouter.put('/:id', changeUser);

module.exports = CarrierRouter;