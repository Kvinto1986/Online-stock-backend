const express = require('express');
const app = express();
const login = require('./routes/loginRoute');
const employees = require('./routes/employeeRoutes');
const companyAdmins = require('./routes/companyAdminRoutes');
const companyAdminsStatistic = require('./routes/companyAdminStatisticRoute');
const warehouses = require('./routes/warehouseRoute');
const ttns = require('./routes/ttnRoutes');
const ttnsOut = require('./routes/ttnOutRoute');
const carriers = require('./routes/carrierRoute');
const drivers = require('./routes/driverRoute');
const senders = require('./routes/senderRoute');
const managerRoute = require('./routes/managerRoute');
const servicesRoute = require('./routes/servicesRoute');

app.use('/login', login);
app.use('/employees', employees);
app.use('/companyAdmins', companyAdmins);
app.use('/companyAdminsStatistic', companyAdminsStatistic);
app.use('/warehouses', warehouses);
app.use('/carriers', carriers);
app.use('/ttns', ttns);
app.use('/drivers', drivers);
app.use('/senders', senders);
app.use('/ttnsOut', ttnsOut);
app.use('/managers', managerRoute);
app.use('/services', servicesRoute);

module.exports = app;