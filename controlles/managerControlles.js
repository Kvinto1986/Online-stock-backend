const TTN = require('../models/ttnModal');
const Warehouse = require('../models/WarehouseModel');

exports.finishWarehausing = (req, res) => {
    const { stockData, wareHousingData } = req.body
    
    const totalArea = wareHousingData.areasData
    .map(unit => unit.area)
    .reduce((a, b) => a + b)

    const goodsArea = [...stockData.areas]
    goodsArea.forEach((element, i) => {
        const initialAreaUnit = stockData.areas.find(area => area.index === (i + 1))
        const changedAreaUnit = wareHousingData.areasData.find(area => area.index === (i + 1))
        element.area = initialAreaUnit.area - changedAreaUnit.area
    });

    // TTN edit
    // 1. Update TTN status 
    // 2. Set the relation with warehouse by that id 
    // 3. Set warehoused area by cargo
    const updateTTN = 
    TTN
    .findOneAndUpdate(
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
    const updateWarehouse =  
    Warehouse
    .findOneAndUpdate(
        {_id: stockData._id},
        {$set: { 
            totalArea: totalArea,
            areas: wareHousingData.areasData,
        }},
        {useNewUrlParser: true}
    )

    Promise
    .all([
        updateTTN, 
        updateWarehouse
    ])
    .then(() => {
        res.json()
    })
    .catch(err => {
        console.log(err);
    })
}