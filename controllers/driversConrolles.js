const Driver = require('../models/driverModel');

exports.addDriver = (req, res) => {
    const license = req.body.drivingLicense;
    Driver.findOne({drivingLicense: license})
        .then((driver) => {
                if(driver) {
                    return res.status(400).json({
                        email: 'The driver is already there'})
                } else {
                    const{email, name, surname, drivingLicense} = req.body;
                    Driver.create({
                        email: email,
                        name: name,
                        surname: surname,
                        drivingLicense: drivingLicense
                    }, (err, driver) => {
                        if(err) return console.error(`We can't add  ${driver}`)
                        res.send(driver)
                        console.log(`${driver} was add`)
                    })

                }
            }
        )
}

exports.getDriver = (req, res) => {
    const{license} = req.params;
    Driver.findOne({drivingLicense: license},
        (err, driver) => {
            if(err) return  res.send(err.message);
            res.send(driver);
     })
}