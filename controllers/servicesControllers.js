const Service = require('../models/ServiceModel');
const jwt = require('jsonwebtoken');
const changeServiceForResult = require('../utils/objectNormalizer');
const {MAIN_ADMIN, EMPLOYEE} = require('../constants/roles');

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
    console.log(req.user.role)
    const servicesList = dbServices.map(element => {
        if (req.user.role === MAIN_ADMIN) {
            return {id: element.name, token: element.token}
        } else return {id: element.name}
    });


    return res.status(200).json(servicesList);
};

exports.deleteService = async (req, res) => {
    const dbService = await Service.findOne({name: req.params.id});
    const deletedService = await dbService.remove();
    const {name: id, token, __v, _id, ...elem} = deletedService.toObject();
    return res.status(200).json({...elem, id});
};
