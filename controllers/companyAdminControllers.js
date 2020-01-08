const CompanyAdmin = require('../models/CompanyAdminModel');
const generator = require('generate-password');
const changeCompanyAdminForResult = require('../utils/objectNormalizer');
const mailer = require('../utils/mailSender');
const {NEW_USER_MESSAGE} = require('../constants/mailMessages');
const bcrypt = require('bcryptjs');

exports.createCompanyAdmin = async (req, res) => {
    const {body} = req;

    const randomPassword = generator.generate({
        length: 10,
        numbers: true
    });

    const dbCompanyAdminByEmail = await CompanyAdmin.findOne({email: body.email});
    if (dbCompanyAdminByEmail) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    }

    const dbCompanyAdminByCompany = await CompanyAdmin.findOne({company: body.company});
    if (dbCompanyAdminByCompany) {
        return res.status(400).json({
            company: 'Company name already exists'
        });
    }

    mailer(body.email, body.email, randomPassword, NEW_USER_MESSAGE);

    const newCompanyAdmin = new CompanyAdmin({...body, password: randomPassword});
    const salt = await bcrypt.genSalt(10);
    newCompanyAdmin.password = await bcrypt.hash(newCompanyAdmin.password, salt);
    const model = await newCompanyAdmin.save();
    const createdCompanyAdmin = changeCompanyAdminForResult(model);
    return res.status(200).json(createdCompanyAdmin);
};

exports.editCompanyAdmin = async (req, res) => {
    const {body} = req;
    const dbCompanyAdmin = await CompanyAdmin.findOneAndUpdate({email: req.params.id}, body, {new: true});

    if (!dbCompanyAdmin) {
        return res.status(400).json({
            user: 'User not found'
        });
    }

    if(body.password){
        const salt = await bcrypt.genSalt(10);
        dbCompanyAdmin.password = await bcrypt.hash(body.password, salt);
    }

    const model = await dbCompanyAdmin.save();
    const editedCompanyAdmin = changeCompanyAdminForResult(model);
    return res.status(200).json(editedCompanyAdmin);
};

exports.getCompanyAdmins = async (req, res) => {
    const dbCompanyAdmins = await CompanyAdmin.find({});
    const companyAdminsList = dbCompanyAdmins.map((elem) => {
        return changeCompanyAdminForResult(elem)
    });

    return res.status(200).json(companyAdminsList);
};

exports.getCompanyAdmin = async (req, res) => {
    const dbCompanyAdmin = await CompanyAdmin.findOne({$or: [{email: req.params.data}, {company: req.params.data}]});
    if (!dbCompanyAdmin) {
        return res.status(400).json({
            user: 'User not found'
        });
    }

    const foundCompanyAdmin = changeCompanyAdminForResult(dbCompanyAdmin);
    return res.status(200).json(foundCompanyAdmin);
};

exports.deleteCompanyAdmin = async (req, res) => {
    const dbCompanyAdmin = await CompanyAdmin.findById(req.params.id);
    const deletedCompanyAdmin = await dbCompanyAdmin.remove();
    const model = changeCompanyAdminForResult(deletedCompanyAdmin);
    return res.status(200).json(model);
};





