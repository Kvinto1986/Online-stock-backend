const express = require('express');
const router = express.Router();
const User = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const mailer = require('../utils/mailSender');
const passport = require('passport');
require('../passport')(passport);

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role === 'companyAdmin') {
        const email = req.body.email;

        User.findOne({email})
            .then(user => {
                if (user) {
                    return res.status(400).json({
                        email: 'Email already exists'
                    });
                } else {

                    const password = generator.generate({
                        length: 10,
                        numbers: true
                    });

                    mailer(email, password);

                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        patronymic: req.body.patronymic,
                        email: email,
                        city: req.body.city,
                        street: req.body.street,
                        house: req.body.house,
                        apartment: req.body.apartment,
                        position: req.body.position,
                        dateOfBirth: req.body.dateOfBirth,
                        password: password,
                        company: req.user.company
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.error('There was an error', err);
                        else {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) console.error('There was an error', err);
                                else {
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            res.json({
                                                id: user._id,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                patronymic: user.patronymic,
                                                email: user.email,
                                                city: user.city,
                                                street: user.street,
                                                house: user.house,
                                                apartment: user.apartment,
                                                position: user.position,
                                                dateOfBirth: user.dateOfBirth,
                                                company: user.company
                                            })
                                        });
                                }
                            });
                        }
                    });
                }
            });
    } else return res.status(400).json({
        user: 'This request is not available to you'
    });
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    if (req.user.role === 'companyAdmin') {

        const company = req.user.company;

        User.find({company})
            .then(warehouse => {

                const list = warehouse.map((elem => {
                    return {
                        id: elem._id,
                        position: elem.position,
                        firstName: elem.firstName,
                        patronymic: elem.patronymic,
                        lastName: elem.lastName,
                        email: elem.email,
                        dateOfBirth: elem.dateOfBirth,
                    }
                }));
                res.json(list)
            });
    }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.role === 'companyAdmin') {
        User.findOne({_id: req.params.id}).then(user => {
            res.status(200).json({
                user: 'Deleted!'
            });
            user.remove().exec()
        })
    } else return res.status(400).json({
        user: 'This request is not available to you'
    });
});

router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}).then(user => {
        if (user) {
            res.json({
                id: user._id,
                position: user.position,
                firstName: user.firstName,
                patronymic: user.patronymic,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                city: user.city,
                street: user.street,
                house: user.house,
                apartment: user.apartment,
                company: user.company,
            });
        } else {
            res.status(400).json({
                user: 'User not found'
            })
        }
    })
});

router.post('/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.patronymic = req.body.patronymic;
                user.email = req.body.email;
                user.city = req.body.city;
                user.street = req.body.street;
                user.house = req.body.house;
                user.apartment = req.body.apartment;
                user.position = req.body.position;
                user.dateOfBirth = req.body.dateOfBirth;
                user.save();
                res.json(user)
            } else {
                res.status(400).json({
                    user: 'User not found'
                })
            }
        })
});

module.exports = router;