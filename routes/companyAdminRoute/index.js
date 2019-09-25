const express = require('express');
const adminRouter = express.Router();
const CompanyAdmin = require('../../models/CompanyAdminModel');
const bcrypt = require('bcryptjs');
const validateAdminInput = require('../../validation/companyAdminValidation');
const generator = require('generate-password');
const mailer = require('../../utils/mailSender');
const {getStatistic, getList, getCompany, changeStatus} = require('../../controlles/adminControllers');

adminRouter.post('/', (req, res) => {


    if (req.user.role === 'mainAdmin') {
        const {errors, isValid} = validateAdminInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        CompanyAdmin.findOne({
            $or: [{email: req.body.email}, {company: req.body.company}]
        })
            .then(companyAdmin => {
                if (companyAdmin) {
                    return res.status(400).json({
                        email: 'Email or company already exists'
                    });
                } else {

                    const password = generator.generate({
                        length: 10,
                        numbers: true
                    });

                    mailer(req.body.email, password);

                    const newCompanyAdmin = new CompanyAdmin({
                        company: req.body.company,
                        email: req.body.email,
                        password: password,
                        active: true,
                        deleteDate: '2050-08-18T21:11:54'
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.error('There was an error', err);
                        else {
                            bcrypt.hash(newCompanyAdmin.password, salt, (err, hash) => {
                                if (err) console.error('There was an error', err);
                                else {
                                    newCompanyAdmin.password = hash;
                                    newCompanyAdmin.save()
                                        .then(user => {
                                            res.json(user)
                                        });
                                }
                            });
                        }
                    });
                    res.json(companyAdmin)
                }
            });
    } else return res.status(400).json({
        user: 'This request is not available to you'
    });
});

adminRouter.post('/getStatistic', getStatistic);
adminRouter.get('/', getList);
adminRouter.post('/getCompany', getCompany);
adminRouter.post('/changeStatus', changeStatus);


module.exports = adminRouter;