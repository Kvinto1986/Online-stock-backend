const Driver = require('../models/DriverModel');
const changeDriverForResult = require('../utils/objectNormalizer');

exports.createDriver = async (req, res) => {
    const {body} = req;
    const dbDriver = await Driver.findOne({license: body.license});
    if (dbDriver) {
        return res.status(400).json({
            license: 'Driver license name already exists'
        });
    }

    const newDriver = new Driver({...body});
    const model = await newDriver.save();
    const createdDriver = changeDriverForResult(model,'license');
    return res.status(200).json(createdDriver);
}

exports.getDriver = async (req, res) => {
    const dbDriver = await Driver.findOne({license: req.params.id});
    if (!dbDriver) {
        return res.status(400).json({
            driver: 'Driver not found'
        });
    }

    const foundDriver = changeDriverForResult(dbDriver,'license');
    return res.status(200).json(foundDriver);
}