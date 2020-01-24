const TTNOrder = require('../models/TtnImportModel');
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


    const newTTNOrder = new TTNOrder({...body});
    newTTNOrder.service = req.service.name;
    const TTNOrderModel = await newTTNOrder.save();
    const createdTTN = changeTtnOrderForResult(TTNOrderModel, 'number');
    return res.status(200).json(createdTTN);
};

exports.getOrder = async (req, res) => {
    const dbTtnOrders = await TTNOrder.findOne({number: req.params.id});
    if (!dbTtnOrders) {
        return res.status(400).json({
            order: 'TTN not found'
        });
    }

    const orders = changeTtnOrderForResult(dbTtnOrders, 'number');
    return res.status(200).json(orders);
};