const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userLogin = require('./routes/loginRoute/index');
const adminRoute = require('./routes/companyAdminRoute/index');
const carrierRoute = require('./routes/carrierRoute');
const ttnRoute = require('./routes/ttnRoute');
const driver = require('./routes/driverRoute');
const managerRoute = require('./routes/managerRoute');
const senders = require('./routes/senderRoute');
const employees = require('./routes/employeeRoutes/index');
const warehouses = require('./routes/warehouseRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/login', userLogin);
app.use('/api/companyAdmins', adminRoute);
app.use('/api/employees', employees);
app.use('/api/drivers', driver);
app.use('/api/carriers', carrierRoute);
app.use('/api/managers', managerRoute);
app.use('/api/ttns', ttnRoute);
app.use('/api/senders', senders);
app.use('/api/warehouses', warehouses);

module.exports = app;