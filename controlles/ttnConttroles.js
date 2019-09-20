const TTN = require('../models/ttnModal');
const passport = require('passport');
require('../passport')(passport);

exports.addTth = async (req, res) => {

    try {
        const {
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
        const ttn = await TTN.create({
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
    }
}

exports.findTtn = async (req, res) => {

    const {ttnNumber} = req.params
    TTN.findOne({number: ttnNumber}).then((ttn) => {
        if (ttn) {
            res.send(ttn)
        } else res.status(400).json({
            ttn: 'TTN not found'
        });
    })
}

exports.findTTNbyNumber = (req, res) => {
    console.log(req.body)
    TTN.findOne({number: req.body.ttnNumber, status: 'Checked'})
        .then(result => {
            if (result !== null) {
                // If we're need to calculate area for each of cargo unit
                if (req.body.calculateAreaFlag) {
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
            } else {
                return res.status(400).json({
                    warehouseTtn: "TTN with this number not found or it already has been warehoused."
                });
            }

        })
}

exports.editTTN = (req, res, next) => {
    TTN
    .findOne({ttnNumber: req.body.number})
    .then(ttn => {

        // TTN status change
        ttn.status = "delivered"
        ttn.save()

        // Warehouse areas status recovery
        Warehouse
        .findOne({_id: ttn.warehouseID})
        .then(stock => {
            let recoveredArea = 0 

            const recoveredAreasState = {...stock.areas}
            recoveredAreasState.forEach((element, i) => {
                const currentAreaUnit = stock.areas.find(area => area.index === (i + 1))
                const warehousedAreaUnit = ttn.warehouseAreas.find(area => area.index === (i + 1))
                
                recoveredArea += warehousedAreaUnit.area
                element.area = currentAreaUnit.area + warehousedAreaUnit.area
            });

            stock.totalArea += recoveredArea 
            stock.areas = recoveredAreasState

            stock.save()

            res.json({message: "Сargo delivered from stock"})
        })
    })
}
exports.getAll = (req, res) => {

    TTN.find({})
        .then(ttns => {
            const list = ttns.map((elem => {
                return {
                    value: elem._id,
                    label: elem.number,
                }
            }));
            res.json(list)
        });
}

exports.getByID = (req, res) => {

    TTN.findOne({_id: req.params.id}).then(ttn => {
        if (ttn) {
            console.log(ttn)
            res.json(ttn);
        } else {
            res.status(400).json({
                ttn: 'TTN not found'
            })
        }
    })
}

exports.getByNumber = (req, res) => {

    TTN.findOne({number: req.params.number}).then(ttn => {
        if (ttn) {
            console.log(ttn)
            res.json(ttn);
        } else {
            res.status(400).json({
                ttn: 'TTN not found'
            })
        }
    })
}
