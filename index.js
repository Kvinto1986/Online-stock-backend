const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const{port, baseUri} = require('./dbconfig');
const mongoose = require("mongoose");
const allUsers = require('./routes/allUsersRoute');
const adminRoute = require('./routes/adminRoute');
const carrierRoute = require('./routes/carrierRoute')
const ttnRoute = require('./routes/ttnRoute');
const getAllSender = require('./routes/senderRoute');
const carrierRoute = require('./routes/carrierRoute');
const ttnRouute = require('./routes/tthRoute');
const driver = require('./routes/driverRoute');
const users = require('./routes/usersRoute');

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
app.use('/api/ttn', ttnRouute);
app.use('/api/users', users);


mongoose.connect(baseUri, {useNewUrlParser: true}, (err) => {
    if(err) return console.error(err);

    app.listen(port, (err) => {
        if(err) {
            console.error(`Server drop`)
        }
        console.log(`Server up on ${port}`)
    })
});
