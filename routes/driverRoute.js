const express = require('express');
const DriverRouter = express.Router();
const{addDriver} = require("../controlles/driversConrolles");;

DriverRouter.post('/addDriver', addDriver);

module.exports = DriverRouter