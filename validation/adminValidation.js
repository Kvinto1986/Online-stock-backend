const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.company = !isEmpty(data.company) ? data.company : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};