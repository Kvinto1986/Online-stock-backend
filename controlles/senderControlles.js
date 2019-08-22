const Sender = require('../models/senderModel');

exports.getAllSenders = (req, res) => {
    Sender.find({},
        (err, sender) => {
            if(err) return console.error(err)
            res.send(sender)
        })
}