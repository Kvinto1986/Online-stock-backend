const TTN = require('../models/ttnModal');

exports.addTth = (req, res) => {
    const{
        number,
        date,
        carrier,
        sender,
        registrar,
        driver,
        carNumber,
        nameAmount,
        productAmount,
        description
    } = req.body;
    TTN.create({
        number: number,
        dataOfRegistration: date,
        sender: sender,
        carrier: carrier,
        registrar: registrar,
        driver: driver,
        carNumber: carNumber,
        nameAmount: nameAmount,
        productAmount: productAmount,
        description: description
    }, (err, ttn) => {
        if(err) return console.error(`${ttn} didn't add`)
        res.send(ttn)
    })
}