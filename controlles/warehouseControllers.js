const Warehouse = require('../models/WarehouseModel');
const validateWarehouseInput = require('../validation/warehouseWalidation');

exports.addWarehouse = (req, res) => {
    Warehouse.findOne({license: req.body.license})
        .then(warehouse => {
            if (warehouse) {
                return res.status(400).json({
                    license: 'License already exists'
                });
            } else {

                const newWarehouse = new Warehouse({
                    adminId: req.body.adminId,
                    name: req.body.name,
                    license: req.body.license,
                    totalArea: req.body.totalArea,
                    areas: req.body.areas,
                });
                newWarehouse.save()
                    .then(warehouse => {
                        res.json(warehouse)
                    });
            }
        })
};

exports.getWarehousesList = (req, res) => {


    Warehouse.find({})
        .then(warehouse => {
            res.json(warehouse)
        });
};

exports.deleteWarehouse = (req, res) => {

    Warehouse.findOneAndDelete({_id: req.body.id})
        .then(warehouse => {
            res.json(warehouse)
            warehouse.remove();

        });
}

exports.getAllWarehouses = (req, res) => {
    Warehouse
    .find({})
    .then(warehouses => {
        if(warehouses) {
            return res.json(warehouses)
        } 
        else {
            return res.status(400).json({stocks: "Stocks for this cargo isn't found"});
        }
    })
    .catch(err => console.log(err))
}
