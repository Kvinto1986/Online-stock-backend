const express = require('express');
const DriverRouter = express.Router();
const{addDriver, getDriver} = require("../controlles/driversConrolles");;

DriverRouter.post('/addDriver', addDriver);
DriverRouter.get('/:license', getDriver);


module.exports = DriverRouter