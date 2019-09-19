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
            description,
            warehouseID,
            warehouseAreas
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
            description: description,
            warehouseID: warehouseID,
            warehouseAreas: warehouseAreas 
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
    TTN // TODO: Find by checked status
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
                warehouseTtn: "TTN with this number not found or already has been warehoused."
            });
        }
        
    })
}

exports.editTTN = (req, res, next) => {
    // TTN status change

    TTN
    .updateOne(
        {number: req.body.ttnNumber},
        {status: "delivered"}
    )
    .then(ttn => {
        // ttn = req.ttn
        // next()

        // Restore stock areas
        Warehouse
        .findOne({ttnNumber: req.ttn.number})
        .then(stock => {
            const restoredArea = stock.totalArea + usedArea
            // const restoredAreas = {...ar}

            stock.areas.forEach(area => {
                area.index
            })

            stock
            .update({totalArea: restoredArea, areas: restoredAreas})
            .then(() => {
                res.json({message: "Сargo delivered from stock"})
            })
            .catch(err => console.error(err))
        })
    })
    .catch(err => console.error(err))
}
