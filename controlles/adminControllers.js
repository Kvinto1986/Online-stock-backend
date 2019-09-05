const CompanyAdmin = require('../models/CompanyAdminModel');
const bcrypt = require('bcryptjs');
const validateAdminInput = require('../validation/companyAdminValidation');
const generator = require('generate-password');
const mailer = require('../utils/mailSender');

exports.getStatistic = (req, res) => {

    if (new Date(req.body.to) < new Date(req.body.from)) {
        return res.status(400).json({
            date: 'Incorrect date period'
        })
    }

    CompanyAdmin.aggregate(
        [

            {
                $lookup: {
                    from: "companyadmins",
                    pipeline: [
                        {
                            $match: {
                                "createDate": {$gte: new Date(req.body.from), $lt: new Date(req.body.to)}
                            }
                        },

                    ],
                    as: "created"
                }
            },

            {
                $lookup: {
                    from: "companyadmins",
                    pipeline: [
                        {
                            $match: {
                                "deleteDate": {$gte: new Date(req.body.from), $lt: new Date(req.body.to)}
                            }
                        },

                    ],
                    as: "deleted"
                }
            },

        ]).then(result => {

        const {created, deleted} = result[0];

        let max = 0;
        if (created.length > deleted.length) {
            max = created.length * 2
        } else max = deleted.length * 2;

        const statistic = {
            created: [created.length, max, 0],
            deleted: [deleted.length, max, 0]
        };

        res.json(statistic)

    })
};


exports.getList = (req, res) => {

    console.log(req)

    CompanyAdmin.find({})
        .then(companyList => {
            const list = {};

            const emailsArr = companyList.map((elem) => {
                const obj = {};
                obj.label = elem.email;
                obj.value = elem.email;
                return obj
            });

            const companiesArr = companyList.map((elem) => {
                const obj = {};
                obj.label = elem.company;
                obj.value = elem.company;
                return obj
            });

            res.json(emailsArr.concat(companiesArr))
        })
};

exports.getCompany = (req, res) => {

    CompanyAdmin.findOne({
        email: req.body.company
    })
        .then(company => {
            if (company) {
                res.json(company)
            } else {
                CompanyAdmin.findOne({
                    company: req.body.company
                }).then(company => {
                    res.json(company)
                })
            }
        })
};

exports.changeStatus = (req, res) => {

    CompanyAdmin.findById(req.body.id)
        .then(company => {
            console.log(company)
            company.active = !company.active;
            company.save()
        }).then(company => {
        res.json(company)
    });
};
