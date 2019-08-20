const express = require('express');
const TtnRouter = express.Router();
const{addTth} = require("../controlles/ttnConttroles");;

TtnRouter.post('/', addTth);

module.exports = TtnRouter