const TTN = require('../models/ttnModal');
const Warehouse = require('../models/WarehouseModel');

// TODO: registerDelivery logic ...
exports.registerDelivery = (req, res) => {}

exports.finishWarehausing = (req, res) => {
    const { stockData, wareHousingData } = req.body

    const totalArea = wareHousingData.areasData
    .map(unit => unit.area)
    .reduce((a, b) => a + b)

    // Change TTN status
    const changeTtnStatus = TTN
    .findOneAndUpdate(
        {_id: wareHousingData.formData._id}, 
        {$set: { status: 'warehoused' }},
        { useNewUrlParser: true }
    )

    // Update stock area states
    const updateStockAreaStates =  Warehouse
    .findOneAndUpdate(
        {_id: stockData._id},
        {$set: { areas: wareHousingData.areasData, totalArea }},
        { useNewUrlParser: true }
    )

    Promise.all([
        changeTtnStatus,
        updateStockAreaStates
    ])
    .then(() => {
        res.json()
    })
    .catch(err => {
        console.log(err);
    })
}