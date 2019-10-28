const Warehouse = require('../models/WarehouseModel');

exports.getWarehouseAddress = async (req, res) => {
    const dbWarehouse = await Warehouse.findOne({license:req.params.id});
    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const foundWarehouse = {address: dbWarehouse.address, GPS: dbWarehouse.GPS,};
    return res.status(200).json(foundWarehouse);
};