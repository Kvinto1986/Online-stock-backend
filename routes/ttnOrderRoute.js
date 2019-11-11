const express = require('express');
const router = express.Router();
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {createOrder} = require('../controllers/ttnOrderControllers');

router.post('',serviceAuth.AUTH(), createOrder);

module.exports = router;