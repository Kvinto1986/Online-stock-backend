const Carrier = require('../models/CarrierModel');

exports.addCarrier = async (req, res) => {
    const{email, tel, company, passportNumber, countryCode} = req.body;
    try {
        await Carrier.create({
            email: email,
            tel: tel,
            company: company,
            passportNumber: passportNumber,
            countryCode: countryCode
        })
            .then(Newcarrier => { res.send(Newcarrier)})
    } catch (err) {
        res.status(400).json({err, massage: 'cant add newCarrier'})
    }
}

 exports.findCarrier = async (req, res) => {
    const{passport} = req.params;
    try {
        await Carrier.findOne({passportNumber: passport})
            .then((carrier) => {res.send(carrier)})
    } catch (err) {
        res.status(400).json({err, massage: 'cant find'})
    }

};

exports.getListCarriers = async (req, res) => {
    try {
        await Carrier.find({})
            .then( carriers => {
                const transformArr = carriers.map((item) => {
                    return {
                        value: item.company,
                        label: item.company.toLocaleUpperCase()
                    }
                });
                res.send(transformArr);
            })
    } catch (err) {
        res.status(400).json({err, message: 'Can not find any carrier'});
    }

};

exports.getAllCarriers = async (req, res) => {
    try{
        await Carrier.find({})
            .then((carriers) => { res.send(carriers)} )
    } catch (err) {
        res.status(400).json({err, message: 'Can not find any carrier'});
    }
};

exports.deleteCarrier = async (req, res) => {
    const{id} = req.params;
    try {
        await Carrier.findOneAndDelete({_id: id})
            .then((carrier) => {res.send(carrier)})
    } catch (err) {
        res.status(400).json({err, message: 'Can not delete'});
    }
};

exports.changeCarrier = async (req, res) => {
    const{id} = req.body;
    try{
        await Carrier.findOneAndUpdate({_id: id}, req.body, {new: true})
            .then((carrier) => { res.send(carrier)})
    } catch (err) {
        res.status(400).json({err, message: "cant update"})
    }
}