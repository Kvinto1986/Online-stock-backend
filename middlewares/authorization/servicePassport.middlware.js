const passport = require('../../passport');

const jwt = require('jsonwebtoken');
const jwtSecretBot = 'ytochka';
const User = require('../../models/UsersBaseModel');

module.exports.AUTH = () => (req, res, next) => {
  passport.authenticate('jwt', {session: false}, function (err, service) {
      if (err) {
          return next(err)
      }

      if (!service) {
          return res.status(400).send("This request is not available to you, you must log in to the system").end()
      }

      req.service = service;
      next()
  })
  (req, res, next);
};

module.exports.SIDEAUTH = () => (req, res, next) => {
    const authHeader = req.headers['bot-token'];
    const decoded = jwt.verify(authHeader, jwtSecretBot);
  
    if (!authHeader) {
      res.status(401).json({message: 'Token not provided!'});
    }
  
    if (!decoded) {
      res.status(401).json({message: 'Token is not verified!'});
    }
  
    try {
        User.findOne({email: decoded.email}).then((user) => {
        if(decoded.email === user.email) {
          next();
        } else {
          res.status(401).json({message: 'User does not match!'})
        }
      })
      .catch((err) => res.status(401).json({message: 'User does not found!'}));
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({message: 'Invalid token!'})
      }
    }
  }