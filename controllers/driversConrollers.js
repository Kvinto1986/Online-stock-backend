const Driver = require('../models/DriverModel');
const changeDriverForResult = require('../utils/objectNormalizer');

exports.createDriver = async (req, res) => {
    const {body} = req;
    const dbDriver = await Driver.findOne({driverLicense: body.driverLicense});
    if (dbDriver) {
        return res.status(400).json({
            license: 'Driver License license name already exists'
        });
    }

    const newDriver = new Driver({...body});
    const model = await newDriver.save();
    const createdDriver = changeDriverForResult(model);
    return res.status(200).json(createdDriver);
}

exports.getDriver = async (req, res) => {
    const dbDriver = await Driver.findOne({driverLicense: req.params.id});
    if (!dbDriver) {
        return res.status(400).json({
            driver: 'Driver not found'
        });
    }

    const foundDriver = changeDriverForResult(dbDriver);
    return res.status(200).json(foundDriver);
}