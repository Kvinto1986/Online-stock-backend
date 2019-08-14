const CompanyAdmin = require('../models/companyAdmin');

exports.getAllAdmins = (req, res) => {
    CompanyAdmin.find({}, (admins) => {
        res.send(admins)
    })
};

exports.getAdmin = (req, res) => {
    const{id} = req.params;

    CompanyAdmin.findById({_id: id}, (admin) => {
        res.send(admin)
    })

};

exports.addAdmin = (req, res) => {
    const{
        role,
        email,
        password,
        date,
        company
    } = req.body;

    CompanyAdmin.create({
        role: role,
        email: email,
        password: password,
        date: date,
        company: company
    }, (err, admin) => {
        if(err) return console.error(err);
        console.log(`Object ${admin} was save`);
        res.send(admin)
    })
};

exports.deleteAdmin = (req, res) => {
    const{id} = req.params;

    User.findOneAndDelete({_id: id}, (err, admin) => {
        if(err) return console.log(err);
        console.log(`Object ${admin} was delete`)
    })

};

exports.changeAdmin = (req, res) => {
    const{id} = req.params;

    CompanyAdmin.findOneAndUpdate({_id: id}, {
        role: role,
        email: email,
        password: password,
        company: company,
        date: date
    }, (err, admin) => {
        if(err) return console.log(err);
        console.log(`Object ${admin} was update`)
        res.send(admin)
    })
};