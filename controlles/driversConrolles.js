const Driver = require('../models/driverModel');

exports.addDriver = (req, res) => {
    const driverEmail = req.body.email;
    Driver.findOne({email: driverEmail})
        .then((driver) => {
            console.log(driver)
                if(driver) {
                    return res.status(400).json({
                        email: 'The driver is already there'})
                } else {
                    const{email, name, surname} = req.body;
                    Driver.create({
                        email: email,
                        name: name,
                        surname: surname
                    }, (err, driver) => {
                        if(err) return console.error(`We can't add  ${driver}`)
                        res.send(driver)
                        console.log(`${driver} was add`)
                    })

                }
            }
        )
}