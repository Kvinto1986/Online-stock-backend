const TTN = require('../models/TtnModel');
const Warehouse = require('../models/WarehouseModel');

exports.getTtnInfo = async (req, res) => {
    const ttnNumber = req.params.id;

    const dbTTN = await TTN.findOne({number: ttnNumber, status: "warehoused"});
    if (!dbTTN) {
        return res.status(400).json({
            number: 'TTN not found'
        });
    }

    const dbWarehouse = await Warehouse.findOne({license: dbTTN.warehouseID});
    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const cargoArray = [];
    dbWarehouse.areas.forEach(area => {
        area.products.forEach(products => {
            if (products.ttnNumber === ttnNumber) {
                cargoArray.push({
                    number: products.id,
                    name: products.name,
                    amount: products.availableAmount,
                    packaging: products.package
                })
            }
        })
    });

    return res.status(200).json(cargoArray);
};