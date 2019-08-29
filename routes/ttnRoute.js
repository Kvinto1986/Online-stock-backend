const express = require('express');
const TtnRouter = express.Router();
const {addTth, findTTNbyNumber} = require("../controlles/ttnConttroles");

TtnRouter.post('/addTtn', addTth);
TtnRouter.post('/findTTNbyNumber', findTTNbyNumber);

module.exports = TtnRouter