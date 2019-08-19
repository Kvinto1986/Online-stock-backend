const Carrier = require('../models/CarrierModel');

exports.addCarrier = (req, res) => {
    const{email, tel, company} = req.body;
    Carrier.create({
        email: email,
        tel: tel,
        company: company
    }, (err, carrier) => {
        if(err) return console.error(err);
        console.log(`${carrier} added to base`);
        res.send(carrier);
    })
}

 exports.findCarrier = (req, res) => {
    const{company} = req.params;
   Carrier.findOne({company: company}, (err, carrier) => {
       if(err) return console.error(err);
       res.send(carrier);
   })
}
exports.getAllCarriers = (req, res) => {
    Carrier.find({}, (err, carriers) => {
        if(err) return console.error(err);
        res.send(carriers);
    })
}
