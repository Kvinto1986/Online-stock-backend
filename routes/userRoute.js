const express = require('express');
const router = express.Router();

const MainAdmin = require('../models/AdminModel');

router.post('/login', (req, res) => {

    console.log(req.body)

    MainAdmin.findOne({email: req.body.email})
        .then(user => {
            console.log(user)
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            if (user) {

                return res.json(user)
            }

        });
});

module.exports = router;