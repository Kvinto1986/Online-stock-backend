const Service = require('../models/ServiceModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const mailer = require('../utils/mailSender');
const {REFRESH_TOKEN_MESSAGE, NEW_TOKEN_MESSAGE} = require('../constants/mailMessages');
const changeServiceForResult = require('../utils/objectNormalizer');

exports.createService = async (req, res) => {
    const {body} = req;
    const dbService = await Service.findOne({$or: [{name: body.name}, {email: body.email}]});
    if (dbService) {
        return res.status(400).json({
            name: 'Service already exists (name or email is already in use)'
        });
    }

    body.secretKey = generator.generate({
        length: 15,
        numbers: true
    });

    const serviceToken = jwt.sign(body, 'secret');
    const newService = new Service({
        name: body.name,
        email: body.email,
        secretKey: body.secretKey
    });
    const salt = await bcrypt.genSalt(10);
    newService.secretKey = await bcrypt.hash(newService.secretKey, salt);

    const model = await newService.save();
    const createdService = changeServiceForResult(model, 'name');
    mailer(body.name, body.email, serviceToken, NEW_TOKEN_MESSAGE);
    return res.status(200).json({id: createdService.id, email: createdService.email});
};

exports.getServices = async (req, res) => {
    const dbServices = await Service.find({});
    const servicesList = dbServices.map(element => {
        return {id: element.name, email: element.email}
    });

    return res.status(200).json(servicesList);
};

exports.editService = async (req, res) => {
    const secret = generator.generate({
        length: 15,
        numbers: true
    });
    const foundService = await Service.findOne({name: req.params.id});
    if (!foundService) {
        return res.status(400).json({
            name: 'Service not found'
        });
    }
    const data = {
        name: foundService.name,
        secretKey: secret,
        email: foundService.email
    };

    const serviceToken = jwt.sign(data, 'secret');

    const salt = await bcrypt.genSalt(10);
    data.secretKey = await bcrypt.hash(data.secretKey, salt);

    const dbService = await Service.findOneAndUpdate({name: req.params.id}, data, {new: true});
    const model = await dbService.save();
    mailer(data.name, data.email, serviceToken, REFRESH_TOKEN_MESSAGE);
    return res.status(200).json({id: model.name, email: model.email});
};

exports.deleteService = async (req, res) => {
    const dbService = await Service.findOne({name: req.params.id});
    const deletedService = await dbService.remove();
    const {name: id, secretKey, token, __v, _id, ...elem} = deletedService.toObject();
    return res.status(200).json({...elem, id});
};
