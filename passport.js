const passport = require("passport");

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/UsersBaseModel');
const Service = require('./models/ServiceModel');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    let Model = '';
    let obj = {};

    if (jwt_payload.id) {
        Model = User;
        obj = {_id: jwt_payload.id}
    } else {
        Model = Service;
        obj = {name: jwt_payload.name}
    }

    Model.findOne(obj)
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