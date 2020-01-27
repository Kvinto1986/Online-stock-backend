const Employee = require('../models/EmployeeModel');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const mailer = require('../utils/mailSender');
const {NEW_USER_MESSAGE} = require('../constants/mailMessages');
const changeEmployeeForResult = require('../utils/objectNormalizer');

exports.createEmployee = async (req, res) => {
    const {body} = req;
    const employeeCompany = req.user.company;
    const randomPassword = generator.generate({
        length: 10,
        numbers: true
    });

    const dbEmployee = await Employee.findOne({email: body.email});
    if (dbEmployee) {
        return res.status(400).json({
            email: 'Email already exists'
        });
    }


    if(body.dateOfBirth === "1970-01-01" ) {

        return res.status(400).json({
            date: 'this field is required'
        });
    }

    if(!body.position.length) {
        return res.status(400).json({
            role: 'this field is required'
        });
    }


    mailer(body.email, body.email, randomPassword, NEW_USER_MESSAGE);

    const newEmployee = new Employee({...body, password: randomPassword, company: employeeCompany});
    const salt = await bcrypt.genSalt(10);
    newEmployee.password = await bcrypt.hash(newEmployee.password, salt);
    const model = await newEmployee.save();
    const createdEmployee = changeEmployeeForResult(model);
    return res.status(200).json(createdEmployee);
};

exports.editEmployee = async (req, res) => {
    const {body} = req;
    const dbEmployee = await Employee.findOneAndUpdate({_id: req.params.id}, body, {new: true});

    if (!dbEmployee) {
        return res.status(400).json({
            user: 'Employee not found'
        });
    }

    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        dbEmployee.password = await bcrypt.hash(body.password, salt);
    }

    const model = await dbEmployee.save();
    const editedEmployee = changeEmployeeForResult(model);
    return res.status(200).json(editedEmployee);
};

exports.getEmployees = async (req, res) => {
    const dbUsers = await Employee.find();
    const employeesList = dbUsers.map((employee) => {
        return changeEmployeeForResult(employee, '_id')
    });
    return res.status(200).json(employeesList);
};

exports.getEmployee = async (req, res) => {
    const dbEmployee = await Employee.findById(req.params.id);
    if (!dbEmployee) {
        return res.status(400).json({
            user: 'Employee not found'
        });
    }

    const foundEmployee = changeEmployeeForResult(dbEmployee);
    return res.status(200).json(foundEmployee);
};

exports.deleteEmployee = async (req, res) => {
    const dbEmployee = await Employee.findById(req.params.id);
    const deletedEmployee = await dbEmployee.remove();
    const model = changeEmployeeForResult(deletedEmployee);
    return res.status(200).json(model);
};
