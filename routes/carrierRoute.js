const express = require('express');
const CarrierRouter = express.Router();
const {addCarrier, findCarrier, getAllCarriers} = require('../controlles/carrierControlles');

CarrierRouter.get('/all', getAllCarriers);
CarrierRouter.get('/:passport', findCarrier);
CarrierRouter.post('/addCarrier', addCarrier);
// CarrierRouter.delete('/:id', deleteUser);
// CarrierRouter.put('/:id', changeUser);

module.exports = CarrierRouter;