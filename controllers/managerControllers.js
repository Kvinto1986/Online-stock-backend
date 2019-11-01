const TTN = require('../models/TtnModel');
const Warehouse = require('../models/WarehouseModel');
const { validateWarehousingData } = require('../middlewares/validation/warehousingValidation');

exports.finishWarehausing = async (req, res) => {

    // try {
        const { stockData, wareHousingData } = req.body
        
        const goodsArea = [...stockData.areas]
        goodsArea.forEach((element, i) => {
            const initialAreaUnit = stockData.areas[i]
            const changedAreaUnit = wareHousingData.areasData.find(area => area.index === (i + 1))

            element.area = initialAreaUnit.area - changedAreaUnit.area
        });
        
        const totalArea = wareHousingData.areasData
        .map(unit => unit.freeArea)
        .reduce((a, b) => a + b)

        // TTN edit
        // 1. Update TTN status
        // 2. Set the relation with warehouse by that id
        // 3. Set warehoused area by cargo
        
        const ttnModel = await TTN.findOneAndUpdate(
            {number: wareHousingData.ttnNumber},
            {$set: {
                status: 'warehoused',
                warehouseID: stockData.id, // -> warehouseLicense
                warehouseAreas: goodsArea
            }},
            {useNewUrlParser: true}
        );

        // Warehouse edit
        // 1. Update total free warehouse area
        // 2. Update warehouse areas state
        
        const warehouseModel = await Warehouse.findOneAndUpdate(
            {license: stockData.id},
            {$set: {
                freeArea: totalArea,
                areas: wareHousingData.areasData,
            }},
            {useNewUrlParser: true}
        );

        await ttnModel.save();
        await warehouseModel.save();

        return res.status(200).json();
    // }
    // catch (e) {
    //     console.log(e)
    // }
}
