const express = require('express');
const app = express();
const login = require('./routes/loginRoute');
const employees = require('./routes/employeeRoutes');
const companyAdmins = require('./routes/companyAdminRoutes');
const companyAdminsStatistic = require('./routes/companyAdminStatisticRoute');
const warehouses = require('./routes/warehouseRoute');

const carrierRoute = require('./routes/carrierRoute');
const ttnRoute = require('./routes/ttnRoute');
const driver = require('./routes/driverRoute');
const managerRoute = require('./routes/managerRoute');
const senders = require('./routes/senderRoute');

app.use('/login', login);
app.use('/employees', employees);
app.use('/companyAdmins', companyAdmins);
app.use('/companyAdminsStatistic', companyAdminsStatistic);
app.use('/warehouses', warehouses);

app.use('/drivers', driver);
app.use('/carriers', carrierRoute);
app.use('/managers', managerRoute);
app.use('/ttns', ttnRoute);
app.use('/senders', senders);


module.exports = app;