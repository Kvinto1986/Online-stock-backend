const TTN = require('../models/tthModal');

exports.addTth = (req, res) => {
    const{number, dataOut, dataOfRegistration, carrier, products, status, registrar } = req.body;
    TTN.create({
        number: number,
        // dataOut: dataOut,
        dataOfRegistration: dataOfRegistration,
        carrier: carrier,
        products: products,
        status: status,
        registrar: registrar
    }, (err, ttn) => {
        if(err) return console.error(`${ttn} didn't add`)
        res.send(ttn)
    })
}