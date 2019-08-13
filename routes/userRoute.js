const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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