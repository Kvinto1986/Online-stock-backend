const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const{port, baseUri} = require('./dbconfig');
const mongoose = require("mongoose");
const userLogin = require('./routes/loginRoute/index');
const adminRoute = require('./routes/companyAdminRoute/index');
const carrierRoute = require('./routes/carrierRoute');
const ttnRoute = require('./routes/ttnRoute');
const driver = require('./routes/driverRoute');
const managerRoute = require('./routes/managerRoute');
const getAllSender = require('./routes/senderRoute');
const employee = require('./routes/employeeRoute');
const warehouses = require('./routes/warehouseRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/login', userLogin);
app.use('/api/companyAdmins', adminRoute);
app.use('/api/employees', employee);

app.use('/api/drivers', driver);
app.use('/api/carriers', carrierRoute);
app.use('/api/managers', managerRoute);
app.use('/api/ttn', ttnRoute);
app.use('/api/sender', getAllSender);
app.use('/api/ttn', ttnRoute);
app.use('/api/warehouses', warehouses);

mongoose.connect(baseUri, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const PORT = process.env.PORT || port;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
