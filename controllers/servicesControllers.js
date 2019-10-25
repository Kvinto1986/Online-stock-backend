const Service = require('../models/ServiceModel');
const changeServiceForResult = require('../utils/objectNormalizer');

exports.createCarrier = async (req, res) => {
    const {body} = req;
    const dbService = await Service.findOne({name: body.name});
    if (dbService) {
        return res.status(400).json({
            name: 'Service already exists'
        });
    }

    const newService = new Service({...body});
    const model = await newService.save();
    const createdService = changeServiceForResult(model,'name');
    return res.status(200).json(createdService);
};