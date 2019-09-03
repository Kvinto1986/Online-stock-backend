const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passport')(passport);

const validateLoginInput = require('../validation/loginValidation');

const User = require('../models/UsersBaseModel');

router.post('/', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = Object.assign({}, user._doc);
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);

                    }
                });
        });
});

module.exports = router;