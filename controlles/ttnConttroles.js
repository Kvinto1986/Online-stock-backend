const TTN = require('../models/ttnModal');

exports.addTth = (req, res) => {
    const{
        number,
        date,
        carrier,
        driver,
        registrar,
        carNumber,
        sender,
        products,
        description
    } = req.body;
    TTN.create({
        number: number,
        dataOfRegistration: date,
        carrier: carrier,
        driver: driver,
        registrar: registrar,
        carNumber: carNumber,
        sender: sender,
        products: products,
        description: description
    }, (err, ttn) => {
        if(err) return console.error(`${ttn} didn't add`)
        res.send(ttn)
    })
}

exports.findTTNbyNumber = (req, res) => {
    TTN
    .findOne({number: req.body.ttnNumber})
    .then(result => {
        if(result) {
            res.send(result)
        } else {
            res.send(null) 
        }
    })
}