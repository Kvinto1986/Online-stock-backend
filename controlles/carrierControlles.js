const Carrier = require('../models/CarrierModel');

exports.addCarrier = (req, res) => {
    console.log(req.body)
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
    const{passport} = req.params;
   Carrier.findOne({passportNumber: passport}, (err, carrier) => {
       if(err) return  console.error("notFindCarrier");
       res.send(carrier);
   })
}
exports.getListCarriers = (req, res) => {
    Carrier.find({}, (err, carriers) => {
        if(err) return console.error(err);
        const transformArr = carriers.map((item) => {
           return {
               value: item.company,
                label: item.company.toLocaleUpperCase()
           }
        });
        res.send(transformArr);
    })
}
