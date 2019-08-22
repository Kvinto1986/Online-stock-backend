const express = require('express');
const TtnRouter = express.Router();
const{addTth} = require("../controlles/ttnConttroles");

TtnRouter.post('/addTtn', addTth);

module.exports = TtnRouter