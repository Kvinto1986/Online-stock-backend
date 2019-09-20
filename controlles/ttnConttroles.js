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
