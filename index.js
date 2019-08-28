const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const{port, baseUri} = require('./dbconfig');
const mongoose = require("mongoose");
const allUsers = require('./routes/allUsersRoute');
const adminRoute = require('./routes/adminRoute');
const carrierRoute = require('./routes/carrierRoute');
const getAllSender = require('./routes/senderRoute');
const ttnRoute = require('./routes/ttnRoute');
const driver = require('./routes/driverRoute');
const users = require('./routes/usersRoute');
const warehouses = require('./routes/warehouseRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/allUsers', allUsers);
app.use('/api/drivers', driver);
app.use('/api/admins', adminRoute);
app.use('/api/carriers', carrierRoute);
app.use('/api/ttn', ttnRoute);
app.use('/api/sender', getAllSender);
app.use('/api/ttn', ttnRoute);
app.use('/api/users', users);
app.use('/api/warehouses', warehouses);


mongoose.connect(baseUri, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
