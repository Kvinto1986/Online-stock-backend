const CompanyAdmin = require('../models/CompanyAdminModel');
const bcrypt = require('bcryptjs');
const validateUserInput = require('../validation/adminValidation');


exports.getAllAdmins = (req, res) => {
    CompanyAdmin.find({}, (admins) => {
        res.send(admins)
    })
};

exports.getAdmin = (req, res) => {
    const{id} = req.params;

    CompanyAdmin.findById({_id: id}, (admin) => {
        res.send(admin)
    })

};

exports.addAdmin = (req, res) => {

    const {errors, isValid} = validateUserInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    CompanyAdmin.findOne({
        email: req.body.email
    }).then(admin => {
        if (admin) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            const newCompanyAdmin = new CompanyAdmin({
                role: req.body.role,
                company: req.body.company,
                email: req.body.email,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newCompanyAdmin.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newCompanyAdmin.password = hash;
                            newCompanyAdmin
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
            res.json(admin)
        }
    });
}


exports.deleteAdmin = (req, res) => {
    const{id} = req.params;

    User.findOneAndDelete({_id: id}, (err, admin) => {
        if(err) return console.log(err);
        console.log(`Object ${admin} was delete`)
    })

};

exports.changeAdmin = (req, res) => {
    const{id} = req.params;

    CompanyAdmin.findOneAndUpdate({_id: id}, {
        role: role,
        email: email,
        password: password,
        company: company,
        date: date
    }, (err, admin) => {
        if(err) return console.log(err);
        console.log(`Object ${admin} was update`)
        res.send(admin)
    })
};