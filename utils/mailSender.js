const nodemailer = require('nodemailer');

function mailer(name, email, value, MESSAGE) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ltr24650@gmail.com',
            pass: 'ltr2019ltr'
        }
    });

    const mailOptions = {
        from: 'managerJohnSnow@gmail.com',
        to: email,
        subject: 'Notification from "Warehouse-online"',
        html: MESSAGE(name, value)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = mailer


