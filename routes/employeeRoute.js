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
                                            res.json(user)
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
            res.json(user);
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

module.exports = router;