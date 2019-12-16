const Warehouse = require('../models/WarehouseModel');

exports.getwarehouseToSideService = async (req, res) => {
    const dbWarehouse = await Warehouse.findOne({license: req.params.id});
    
    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const warehouseData = {
        areas: dbWarehouse.areas, 
        company: dbWarehouse.company,
        name: dbWarehouse.name,
        license: dbWarehouse.license,
        freeArea: dbWarehouse.freeArea,
        totalArea: dbWarehouse.totalArea,
        address: dbWarehouse.address, 
    };

    return res.status(200).json(warehouseData);
};