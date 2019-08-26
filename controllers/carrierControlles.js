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
};

 exports.findCarrier = (req, res) => {
    const{passport} = req.params;
   Carrier.findOne({passportNumber: passport}, (err, carrier) => {
       if(err) return  console.error("notFindCarrier");
       res.send(carrier);
   })
};

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
};

exports.getAllCarriers = (req, res) => {
    Carrier.find({}, (err, carriers) => {
        if(err) console.error(err);
        res.send(carriers);
    })
};

exports.deleteCarrier = (req, res) => {
    const{id} = req.params;
    Carrier.findOneAndDelete({_id: id}, (err, carrier) => {
        if(err) return console.log(err)
        console.log(`Object ${carrier} was delete`)
        res.send(carrier)
    })
};




