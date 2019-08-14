const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const{port, baseUri} = require('./dbconfig');
const mongoose = require("mongoose");
const allUsers = require('./routes/allUsersRoute');
const users = require('./routes/userRoute');

const app = express();
const allUsers = require('./routes/allUsers');
const userRout = require('./routes/userRouter');
const adminRoute= require('./routes/companyAdmin');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/allUsers', allUsers);

app.use('/api/admins', adminRoute);


mongoose.connect(baseUri, {useNewUrlParser: true}, (err) => {
    if(err) return console.error(err);

    app.listen(port, (err) => {
        if(err) {
            console.error(`Server drop`)
        }
        console.log(`Server up on ${port}`)
    })
});
