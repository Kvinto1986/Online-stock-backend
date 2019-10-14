const TTN = require('../models/TtnModel');
const changeTTNForResult = require('../utils/objectNormalizer');

exports.createTTN = async (req, res) => {
    const {body} = req;

    const dbTTN = await TTN.findOne({number: body.number});
    if (dbTTN) {
        return res.status(400).json({
            number: 'TTN number name already exists'
        });
    }

    const newTTN = new TTN({...body});
    const model = await newTTN.save();
    const createdTTN = changeTTNForResult(model,'number');
    return res.status(200).json(createdTTN);

};

exports.getTTN = async (req, res) => {
    const dbTTN = await TTN.findOne({number: req.params.id});

    if (!dbTTN) {
        return res.status(400).json({
            number: 'TTN not found'
        });
    }

    const foundTTN = changeTTNForResult(dbTTN,'number');
    return res.status(200).json(foundTTN);
};

exports.editTTN = async (req, res) => {
    const {body} = req;
    const dbTTN = await TTN.findOneAndUpdate({number : req.params.id}, body, {new: true});

    if (!dbTTN) {
        return res.status(400).json({
            ttn: 'TTN not found'
        });
    }

    const model = await dbTTN.save();
    const editedTTN = changeTTNForResult(model,'number');
    return res.status(200).json(editedTTN);
};
