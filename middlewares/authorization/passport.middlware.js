const passport = require('../../passport');

module.exports.AUTH = (roles) => (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function(err, user) {
        if (err) { return next(err) }
        if (!user) { return res.send("Custom Unauthorised").end() }

        if (!roles.includes(user.role)) {
            return res.status(403).json({
                user: 'This request is not available to you'
            })
        }

        req.user = user;
        next();
    })(req, res, next);
};