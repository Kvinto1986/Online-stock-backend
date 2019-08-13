const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const{port, baseUri} = require('./dbconfig');
const mongoose = require("mongoose");
const Admin = require('./models/mainAdmin');

const users = require('./routes/userRoute');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/rootadmins', users);

mongoose.connect(baseUri, {useNewUrlParser: true}, (err) => {
    if(err) return console.error(err);

    app.listen(port, (err) => {
        if(err) {
            console.error(`Server drop`)
        }
        console.log(`Server up on ${port}`)
    })
});
