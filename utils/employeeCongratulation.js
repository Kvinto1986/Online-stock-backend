const moment = require('moment');
const cron = require('node-cron');
const User = require('../models/EmployeeModel');
const CompanyAdmin = require('../models/CompanyAdminModel');
const mailer = require('../utils/congratulationMailer');


const timer = function () {
    cron.schedule('0 0 0 * * *', () => {
        const today = moment().format('MMM Do');
        User.find({}).then(users => {
            users.map((element) => {
                const birthDay = moment(element.dateOfBirth).format('MMM Do');
                if (today === birthDay) {
                    CompanyAdmin.findOne({company: element.company}).then((admin) => {
                        mailer(element.email,element.firstName,admin.congratulationTemplate)
                    });
                }

            })
        })
    })
};
module.exports = timer;