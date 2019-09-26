const passport = require("passport");

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/UsersBaseModel');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload._id})
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => {
            return done(err, false)
        });
}));

module.exports = passport;