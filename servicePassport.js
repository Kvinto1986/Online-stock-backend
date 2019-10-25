const passport = require("passport");
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Service = require('./models/ServiceModel');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts, (jwt_payload, done) => {

    Service.findOne({name: jwt_payload.name})
        .then(service => {
            if (service) {
                return done(null, service);
            }
            return done(null, false);
        })
        .catch(err => {
            return done(err, false)
        });
}));

module.exports = passport;