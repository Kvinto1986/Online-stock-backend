const Carrier = require('../models/CarrierModel');
const changeCarrierForResult = require('../utils/objectNormalizer');

exports.createCarrier = async (req, res) => {
    const {body} = req;
    const dbCarrier = await Carrier.findOne({unp: body.unp});
    if (dbCarrier) {
        return res.status(400).json({
            unp: 'UNP already exists'
        });
    }

    const newCarrier = new Carrier({...body});
    const model = await newCarrier.save();
    const createdCarrier = changeCarrierForResult(model, 'unp');
    return res.status(200).json(createdCarrier);
};

exports.editCarrier = async (req, res) => {
    const {body} = req;
    const dbCarrier = await Carrier.findOneAndUpdate({unp: req.params.id}, body, {new: true});
    if (!dbCarrier) {
        return res.status(400).json({
            carrier: 'Carrier not found'
        });
    }

    const model = await dbCarrier.save();
    const editedCarrier = changeCarrierForResult(model, 'unp');
    return res.status(200).json(editedCarrier);
};

exports.getCarriers = async (req, res) => {
    const dbCarriers = await Carrier.find({});
    const carriersList = dbCarriers.map((elem) => {
        return changeCarrierForResult(elem, 'unp')
    });

    return res.status(200).json(carriersList);
};

exports.getCarrier = async (req, res) => {
    const dbCarrier = await Carrier.findOne({unp: req.params.id});
    if (!dbCarrier) {
        return res.status(400).json({
            carrier: "Carrier not found"
        });
    }

    const foundCarrier = changeCarrierForResult(dbCarrier, 'unp');
    return res.status(200).json(foundCarrier);
};

exports.deleteCarrier = async (req, res) => {
    const dbCarrier = await Carrier.findOne({unp: req.params.id});
    const deletedCarrier = await dbCarrier.remove();
    const model = changeCarrierForResult(deletedCarrier, 'unp');
    return res.status(200).json(model);
};


