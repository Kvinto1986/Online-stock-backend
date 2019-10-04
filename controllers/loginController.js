const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersBaseModel');
const changeUserForResult = require('../utils/objectNormalizer');

exports.login = async (req, res) => {
    const {body} = req;

    const dbUser = await User.findOne({email: body.email});
    if (!dbUser) {
        return res.status(400).json({
            email: 'User not found'
        })
    }

    const isMatch = await bcrypt.compare(body.password, dbUser.password);
    if (!isMatch) {
        return res.status(400).json({
            password: 'Incorrect Password'
        })
    }

    const user=changeUserForResult(dbUser);
    
    jwt.sign(user, 'secret', {expiresIn: 3600}, (err, token) => {
        if (err) {
            return res.status(400).json({password: 'There is some error in token'})
        } else {
            res.status(200).json({success: true, token: `Bearer ${token}`})
        }
    })
};