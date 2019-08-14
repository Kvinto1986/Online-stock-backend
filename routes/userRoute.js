const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/AdminModel');

router.post('/registration', function (req, res) {

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const newUser = new User({
                role: 'mainAdmin',
                //company:'test2 company',
                //surname: 'test3',
                //fathername:"test3",
                //city: "test3",
                //street: "test3",
                //build: '12',
               // flat: '23',
                //name: 'test3',
                email: 'mainAdmin@mail.com',
                password: '555555',
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
            res.json(user)
        }
    });
});

module.exports = router;