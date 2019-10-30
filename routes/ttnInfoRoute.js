const express = require('express');
const router = express.Router();
const serviceAuth = require('../middlewares/authorization/servicePassport.middlware');
const {getTtnInfo} = require('../controllers/ttnInfoController');

router.get('/:id',serviceAuth.AUTH(), getTtnInfo);

module.exports = router;