const express = require('express');
const TtnRouter = express.Router();
const {addTth, findTTNbyNumber, findTtn} = require("../controlles/ttnConttroles");

TtnRouter.post('/addTtn', addTth);
TtnRouter.post('/findTTNbyNumber', findTTNbyNumber);
TtnRouter.get(`/:ttnNumber`, findTtn)

module.exports = TtnRouter
