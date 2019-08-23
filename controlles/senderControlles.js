const Sender = require('../models/senderModel');

exports.getAllSenders = (req, res) => {
    Sender.find({},
        (err, sender) => {
            if(err) return console.error(err)
            const transformArr = sender.map((item) => {
                return {
                    value: item.name,
                    label: item.name.toLocaleUpperCase()
                }
            });
            res.send(transformArr);
        })
}