const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.license)) {
        errors.license = 'License field is required';
    }


    if (data.totalArea<1) {
        errors.totalArea = 'Area field is required';
    }

    if (data.areas.length<1) {
        errors.areas = 'Areas is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};