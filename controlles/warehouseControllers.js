const Warehouse = require('../models/WarehouseModel');
const validateWarehouseInput = require('../validation/warehouseWalidation');

exports.addWarehouse = (req, res) => {
    const {errors, isValid} = validateWarehouseInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Warehouse.findOne({license: req.body.license})
        .then(warehouse => {
            if (warehouse) {
                return res.status(400).json({
                    license: 'License already exists'
                });
            } else {
                const newWarehouse = new Warehouse({
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


