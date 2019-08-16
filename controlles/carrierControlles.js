const Carrier = require('../models/CarrierModel');

exports.addCarrier = (req, res) => {
    const{email, tel, company} = req.body;
    Carrier.create({
        email: email,
        tel: tel,
        company: company
    }, (err, carrier) => {
        if(err) return console.error(err);
        console.error(`${carrier} added to base`);
        res.send(carrier);
    })
}

 exports.findCarrier = (req, res) => {
   const{id} = req.body;
   Carrier.findOne({_id: id}, (err, carrier) => {
       if(err) return console.error(err);
       res.send(carrier);
   })
}