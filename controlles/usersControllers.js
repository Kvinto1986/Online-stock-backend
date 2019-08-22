const User = require('../models/UsersModel');
const bcrypt = require('bcryptjs');
const validateUserInput = require('../validation/userValidation');
const generator = require('generate-password');
const mailer = require('../utils/mailSender');

exports.addUser = (req, res) => {
    const {errors, isValid} = validateUserInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
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

                mailer(req.body.email, password);

                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    patronymic: req.body.patronymic,
                    email: req.body.email,
                    city: req.body.city,
                    street: req.body.street,
                    house: req.body.house,
                    apartment: req.body.apartment,
                    role: req.body.role,
                    dateOfBirth: req.body.dateOfBirth,
                    company: req.body.company,
                    password:password
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
};


