const TTN = require('../models/ttnModal');

exports.addTth = async (req, res) => {

    try {
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
        const ttn  = await TTN.create({
            number: number,
            dataOfRegistration: date,
            carrier: carrier,
            driver: driver,
            registrar: registrar,
            carNumber: carNumber,
            sender: sender,
            products: products,
            description: description
        })
        res.send(ttn)
    } catch (e) {
        console.log(e)
    }
}

exports.findTtn = async (req, res) => {
    const{ttnNumber} = req.params
    TTN.findOne({number: ttnNumber}, (err, ttn) => {
        if(err) return console.error(err)
        res.send(ttn)
    })
}

exports.findTTNbyNumber = (req, res) => {
    TTN
    .findOne({number: req.body.ttnNumber})
    .then(result => {
        if (result !== null) {
            res.send(result)
        }
        else {
            return res.status(400).json({
                warehouseTtn: "TTN not found"
            });
        }
        
    })
}
