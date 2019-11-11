const TTNOrder = require('../models/TtnOrderModel');
const Warehouse = require('../models/WarehouseModel');
const changeTtnOrderForResult = require('../utils/objectNormalizer');

exports.createOrder = async (req, res) => {
    const {body} = req;

    const dbTTNOrder = await TTNOrder.findOne({number: body.number});
    if (dbTTNOrder) {
        return res.status(400).json({
            number: 'TTN number name already exists'
        });
    }

    const dbWarehouse = await Warehouse.findOne({license: body.warehouseLicense});
    if (!dbWarehouse) {
        return res.status(400).json({
            error: 'Warehouse not found'
        });
    }

    body.cargo.forEach((cargo) => {
        dbWarehouse.areas.forEach(elem => {
            elem.products.forEach(product => {
                if (product.id === cargo.number) {
                    product.availableAmount -= cargo.amount
                }
            })
        })
    });

    const newTTNOrder = new TTNOrder({...body});
    const TTNOrderModel = await newTTNOrder.save();
    const dbWarehouseModel = await Warehouse.findOneAndUpdate({license: body.warehouseLicense}, dbWarehouse, {new: true});
    await dbWarehouseModel.save();
    const createdTTN = changeTtnOrderForResult(TTNOrderModel, 'number');
    return res.status(200).json(createdTTN);
};