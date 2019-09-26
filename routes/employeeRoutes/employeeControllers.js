const Employee = require('../../models/EmployeeModel');
const generator = require('generate-password');
const mailer = require('../../utils/mailSender');

const changeEmployeeForResult = function (employeeModel) {
    const {_id: id, password, __v, ...user} = employeeModel.toObject();
    return {...user, id}
};

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

    mailer(body.email, randomPassword);

    const newEmployee = new Employee({...body, password: randomPassword, company: employeeCompany});
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

    const model = await dbEmployee.save();
    const editedEmployee = changeEmployeeForResult(model);
    return res.status(200).json(editedEmployee);
};

exports.getEmployees = async (req, res) => {
    const empaloyeeCompany = req.user.company;
    const dbUsers = await Employee.find({company: empaloyeeCompany});
    const employeesList = dbUsers.map((employee) => {
        return changeEmployeeForResult(employee)
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
