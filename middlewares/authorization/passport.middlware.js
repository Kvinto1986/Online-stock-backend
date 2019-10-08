const passport = require('../../passport');
const {EMPLOYEE} = require('../../constants/roles');

module.exports.AUTH = (availableRoles, employeePosition) => (req, res, next) => {
    passport.authenticate('jwt', {session: false}, function (err, user) {
        console.log(user)
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send("Custom Unauthorised").end()
        }

        if (!availableRoles.includes(user.role)) {
            return res.status(403).json({
                user: 'This request is not available to you'
            })
        }

        if (availableRoles.includes(EMPLOYEE) && user.role === 'employee') {
            user.position.map(elem => {
                if (!employeePosition.includes(elem)) {
                    return res.status(403).json({
                        user: 'This request is not available to you'
                    })
                }
            })
        }

        req.user = user;
        next()
    })
    (req, res, next);
};