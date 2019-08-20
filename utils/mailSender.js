const nodemailer = require('nodemailer');


function mailer(email, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'managerjohnsnow@gmail.com',
            pass: 'John1234567890Snow'
        }
    });

    const mailOptions = {
        from: 'managerJohnSnow@gmail.com',
        to: email,
        subject: 'Congratulations!',
        text: `Congratulations! 
        Now you have an account in the Online Warehouse system.
        Login: ${email}
        Temporary password: ${password}
        Do not show anyone your temporary password, and change it in your account at your earliest convenience!`
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


