const isEmpty = require('./is-empty');

exports.validateWarehousingData = (data) => {
    let errors = {};

    const { stockData, wareHousingData } = data;
    
    const isInvalidCargoUnitArea = 
    wareHousingData.areasData.some((warehouseArea, i) => {
        const isInvalid = 
        (warehouseArea.area < 0) || 
        (warehouseArea.area > stockData.areas[i])
        ? true
        : false

        return isInvalid;
    });

    if (isInvalidCargoUnitArea) {
        errors.warehousing = 'Unexpected cargo area value';
    };

    if (!stockData || !stockData) {
        errors.warehousing = 'Data is undefined';
    };
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
};