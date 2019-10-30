const passport = require('../../passport');

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