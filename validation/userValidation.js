const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.patronymic = !isEmpty(data.patronymic) ? data.patronymic : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.street = !isEmpty(data.street) ? data.street : '';
    data.house = !isEmpty(data.house) ? data.house : '';
    data.apartment = !isEmpty(data.apartment) ? data.apartment : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.role = !isEmpty(data.role) ? data.role : '';
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : '';

    if (Validator.isEmpty(data.role)) {
        errors.role = 'Role field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};