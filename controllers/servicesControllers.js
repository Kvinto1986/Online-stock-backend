const Service = require('../models/ServiceModel');
const jwt = require('jsonwebtoken');
const changeServiceForResult = require('../utils/objectNormalizer');
const TTN = require('../models/TtnModel');
const Warehouse = require('../models/WarehouseModel');

exports.createService = async (req, res) => {
    const {body} = req;
    const dbService = await Service.findOne({name: body.name});
    if (dbService) {
        return res.status(400).json({
            name: 'Service already exists'
        });
    }

    const serviceToken = jwt.sign(body, 'secret');
    const newService = new Service({name: body.name, token: serviceToken});
    const model = await newService.save();
    const createdService = changeServiceForResult(model, 'name');
    return res.status(200).json(createdService);
};

exports.getService = async (req, res) => {
    const ttnNumber=req.params.id;

    const dbTTN = await TTN.findOne({number: ttnNumber,status:"warehoused"});
    if (!dbTTN) {
        return res.status(400).json({
            number: 'TTN not found'
        });
    }

    const dbWarehouse = await Warehouse.findOne({license:dbTTN.warehouseID});
    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const cargoArray=[];
    dbWarehouse.areas.forEach(area=>{
        area.products.forEach(products=>{
            if(products.ttnNumber===ttnNumber){
                cargoArray.push({name:products.name,amount:products.amount,packaging:products.dimension})
            }
        })
    });

    return res.status(200).json(cargoArray);
};
