const Sender = require('../models/senderModel');

exports.getAllSenders = async (req, res) => {
    try {
        const senderList = await Sender.find({})
        const transformArr = senderList.map((item) => {
            return {
                value: item.name,
                label: item.name.toLocaleUpperCase()
            }
        })
        res.send(transformArr)
    } catch (e) {
        res.status(400).json({e, message: `cant find any sender`})
    }
}