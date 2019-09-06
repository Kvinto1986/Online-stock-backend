const express = require('express');
const router = express.Router();
const User = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const validateUserInput = require('../validation/userValidation');
const generator = require('generate-password');
const mailer = require('../utils/mailSender');
const passport = require('passport');
require('../passport')(passport);

router.post('/', (req, res) => {
    const {errors, isValid} = validateUserInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

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
                    company: req.body.company,
                    password: password
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
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    if (req.user.role === 'companyAdmin') {

        const company = req.user.company;

        User.find({company})
            .then(warehouse => {

                const list=warehouse.map((elem=>{
                    return {
                        id:elem._id,
                        position:elem.position,
                        firstName:elem.firstName,
                        patronymic:elem.patronymic,
                        lastName:elem.lastName,
                        email:elem.email,
                        dateOfBirth:elem.dateOfBirth,
                    }
                }));
                res.json(list)
            });
    }
});

module.exports = router;