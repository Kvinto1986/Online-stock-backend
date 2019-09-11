const express = require('express');
const SenderRoute = express.Router();
const { getAllSenders } = require("../controlles/senderControlles");

SenderRoute.get('/', getAllSenders);

module.exports = SenderRoute;