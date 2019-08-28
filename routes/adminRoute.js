const express = require('express');
const adminRouter = express.Router();
const {addAdmin,getStatistic,getList,getCompany,changeStatus} = require('../controlles/adminControllers');


adminRouter.post('/registration', addAdmin);
adminRouter.post('/getStatistic', getStatistic);
adminRouter.post('/getList', getList);
adminRouter.post('/getCompany', getCompany);
adminRouter.post('/changeStatus', changeStatus);


module.exports = adminRouter;