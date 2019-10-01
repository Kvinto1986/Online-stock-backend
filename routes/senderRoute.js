const express = require('express');
const route = express.Router();
const { getSenders } = require("../controllers/senderControlles");

route.get('/', getSenders);

module.exports = route;