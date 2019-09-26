const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const congratulationsSender = require('./utils/employeeCongratulation');
const {port, baseUri} = require('./dbconfig');

congratulationsSender();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/api', router);

mongoose.connect(baseUri, {useNewUrlParser: true}).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    }
);

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
