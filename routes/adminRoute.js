const express = require('express');
const adminRouter = express.Router();
const {addAdmin,getStatistic} = require('../controlles/adminControlles');


adminRouter.post('/registration', addAdmin);
adminRouter.post('/getStatistic', getStatistic);


module.exports = adminRouter;