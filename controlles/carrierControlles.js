const Carrier = require('../models/CarrierModel');

exports.addCarrier = (req, res) => {
    const{email, tel, company, passportNumber, countryCode} = req.body;
    Carrier.create({
        email: email,
        tel: tel,
        company: company,
        passportNumber: passportNumber,
        countryCode: countryCode
    }, (err, carrier) => {
        if(err) return console.error(err);
        console.log(`${carrier} added to base`);
        res.send(carrier);
    })
}

 exports.findCarrier = (req, res) => {
    console.log(req.params)
    const{passport} = req.params;
   Carrier.findOne({passportNumber: passport}, (err, carrier) => {
       if(err) return  res.send(err.message);
       res.send(carrier);
   })
}
exports.getAllCarriers = (req, res) => {
    Carrier.find({}, (err, carriers) => {
        if(err) return console.error(err);
        res.send(carriers);
    })
}
