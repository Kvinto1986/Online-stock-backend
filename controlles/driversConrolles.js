const Driver = require('../models/driverModel');

exports.addDriver = async (req, res) => {
    const {email, name, surname, drivingLicense} = req.body;
    try {
        const driver = await Driver.findOne({drivingLicense: drivingLicense})
        if (!!driver) {
            Driver.create({
                email: email,
                name: name,
                surname: surname,
                drivingLicense: drivingLicense
            })
        }
    } catch (e) {
        console.log(e)
    }
}

exports.getDriver = async (req, res) => {
    const{license} = req.params;
        try{
            const driver = await Driver.findOne({drivingLicense: license})
            res.send(driver);
        } catch (e) {
            console.error(e)
        }
}