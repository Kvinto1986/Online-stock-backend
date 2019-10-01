const Sender = require('../models/SenderModel');
const changeSenderForResult = require('../utils/objectNormalizer');

exports.getSenders = async (req, res) => {
    const dbSenders = await Sender.find({});
    const sendersList = dbSenders.map((elem) => {
        return changeSenderForResult(elem)
    });

    return res.status(200).json(sendersList);
}