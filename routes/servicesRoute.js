const express = require('express');
const router = express.Router();
const {createCarrier, editCarrier, getCarriers, getCarrier, deleteCarrier} = require('../controllers/servicesControllers');

router.post('', createCarrier);
//router.post('/:id', editCarrier);
//router.get('', getCarriers);
//router.get('/:id', getCarrier);
//router.delete('/:id', deleteCarrier);

module.exports = router;