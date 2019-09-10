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
    .findOne({number: req.body.ttnNumber, status: 'registred'})
    .then(result => {
        if (result !== null) {
            // If we're need to calculate area for each of cargo unit
            if(req.body.calculateAreaFlag) {
                result.products
                .forEach(product => {
                    switch (product.type) {
                        case 'BOX':
                            // TODO: Yury
                            // Type of products amount should be Number, not String
                            product.size = Number(product.amount) // Fix this
                            break;
                        case 'KG':
                            product.size = product.amount / 100
                            break;
                        default:
                            break;
                    }
                });
            }

            res.send(result)
        }
        else {
            return res.status(400).json({
                warehouseTtn: "TTN with this number not found or it already has been warehoused."
            });
        }
        
    })
}
