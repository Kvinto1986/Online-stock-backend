const express = require('express');
const CarrierRouter = express.Router();
const {addCarrier, findCarrier, getListCarriers} = require('../controlles/carrierControlles');

CarrierRouter.get('/', getListCarriers);
CarrierRouter.get('/:passport', findCarrier);
CarrierRouter.post('/addCarrier', addCarrier);
// CarrierRouter.delete('/:id', deleteUser);
// CarrierRouter.put('/:id', changeUser);

module.exports = CarrierRouter;