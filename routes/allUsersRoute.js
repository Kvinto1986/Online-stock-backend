const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateLoginInput = require('../validation/loginValidation');

const MainAdmin = require('../models/AdminModel');

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    MainAdmin.aggregate([

        {
            $lookup: {
                from: "rootadmins",
                pipeline: [
                    {$match: {email: email}},
                ],
                as: "rootadmins"
            }
        },

        {
            $lookup: {
                from: "users",
                pipeline: [
                    {$match: {email: email}},
                ],
                as: "users"
            }
        },

        {
            $lookup: {
                from: "companyadmins",
                pipeline: [
                    {$match: {email: email}},
                ],
                as: "companyadmins"
            }
        },


    ]).then(result => {
        const {rootadmins, users, companyadmins} = result[0];

        const userArr = rootadmins.concat(users.concat(companyadmins));

        if (userArr.length > 0) {
            const user = userArr[0];
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            role: user.role,
                            company: user.company,
                            email: user.email,
                        };
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

                })

        } else {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
    })

});

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;