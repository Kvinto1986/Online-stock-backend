const TTN = require('../models/TtnModel');
const Warehouse = require('../models/WarehouseModel');
const { validateWarehousingData } = require('../middlewares/validation/warehousingValidation');

exports.finishWarehausing = (req, res) => {
    try {
        const { stockData, wareHousingData } = req.body
        
        const goodsArea = [...stockData.areas]
        goodsArea.forEach((element, i) => {
            const initialAreaUnit = stockData.areas[i]
            const changedAreaUnit = wareHousingData.areasData.find(area => area.index === (i + 1))
            
            element.area = initialAreaUnit.area - changedAreaUnit.area
        });

        console.log(goodsArea);
        
        const totalArea = wareHousingData.areasData
        .map(unit => unit.area)
        .reduce((a, b) => a + b)
    
        // TTN edit
        // 1. Update TTN status
        // 2. Set the relation with warehouse by that id
        // 3. Set warehoused area by cargo
        
        const ttnRequest = TTN.findOneAndUpdate(
            {_id: wareHousingData.formData._id},
            {$set: {
                status: 'warehoused',
                warehouseID: stockData._id,
                warehouseAreas: goodsArea
            }},
            {useNewUrlParser: true}
        )

        // Warehouse edit
        // 1. Update total free warehouse area
        // 2. Update warehouse areas state
    
        const warehouseRequest = Warehouse.findOneAndUpdate(
            {_id: stockData._id},
            {$set: {
                totalArea: totalArea,
                areas: wareHousingData.areasData,
            }},
            {useNewUrlParser: true}
        )

        Promise
        .all([ttnRequest, warehouseRequest])
        .then(() => {
            res.status(200).json();
        })
    }
    catch (e) {
        console.log(e)
    }

    return res.status(200).json();
}

exports.validateWarehousing = async (req, res, next) => {
    const { errors, isValid } = validateWarehousingData(req.body);

    if(!isValid) {   
        return res.status(400).json(errors);
    }
    else {
        next();
    }
};