const express = require('express');
const TtnRouter = express.Router();
const {addTth, findTTNbyNumber, findTtn,getAll} = require("../controlles/ttnConttroles");

TtnRouter.post('/addTtn', addTth);
TtnRouter.post('/findTTNbyNumber', findTTNbyNumber);
TtnRouter.get(`/:ttnNumber`, findTtn)
TtnRouter.get('/', getAll)



module.exports = TtnRouter
