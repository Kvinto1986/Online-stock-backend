const passport = require("passport");
const bcrypt = require('bcryptjs');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/UsersBaseModel');
const Service = require('./models/ServiceModel');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.id) {
        User.findOne({_id: jwt_payload.id})
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                return done(err, false)
            });
    } else {
        Service.findOne({name: jwt_payload.name, email: jwt_payload.email})
            .then(user => {
                if (user) {
                    bcrypt.compare(jwt_payload.secretKey, user.secretKey)
                        .then(isMatch => {
                            if (isMatch) {
                                return done(null, user);
                            }
                            return done(null, false);
                        })
                }
            })
            .catch(err => {
                return done(err, false)
            });
    }
}));

module.exports = passport;