const express = require('express');
const CarrierRouter = express.Router();
const {addCarrier, findCarrier, getListCarriers, getAllCarriers, deleteCarrier, changeCarrier} = require('../controlles/carrierControlles');

CarrierRouter.get('/', getListCarriers);
CarrierRouter.get('/all', getAllCarriers);
CarrierRouter.get('/:passport', findCarrier);
CarrierRouter.post('/addCarrier', addCarrier);
CarrierRouter.delete('/:id', deleteCarrier);
CarrierRouter.post('/update', changeCarrier);

module.exports = CarrierRouter;