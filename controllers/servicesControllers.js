const Service = require('../models/ServiceModel');
const jwt = require('jsonwebtoken');
const changeServiceForResult = require('../utils/objectNormalizer');

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

exports.getServices = async (req, res) => {
    const dbServices = await Service.find({});
    const servicesList = dbServices.map(element => {
        const {name: id, token, __v, _id, ...elem} = element.toObject();
        return {...elem, id}
    });


    return res.status(200).json(servicesList);
};

exports.deleteService = async (req, res) => {
    const dbService = await Service.findOne({name: req.params.id});
    const deletedService = await dbService.remove();
    const {name: id, token, __v, _id, ...elem} = deletedService.toObject();
    return res.status(200).json({...elem, id});
};
