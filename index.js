const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const{port, baseUri} = require('./dbconfig');
const mongoose = require("mongoose");


const allUsers = require('./routes/allUsers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/allUsers', allUsers);

mongoose.connect(baseUri, {useNewUrlParser: true}, (err) => {
    if(err) return console.error(err);

    app.listen(port, (err) => {
        if(err) {
            console.error(`Server drop`)
        }
        console.log(`Server up on ${port}`)
    })
});
