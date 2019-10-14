const Warehouse = require('../models/WarehouseModel');
const changeWarehouseForResult = require('../utils/objectNormalizer');

exports.createWarehouse = async (req, res) => {
    const {body} = req;

    const dbWarehouse = await Warehouse.findOne({license: body.license});
    if (dbWarehouse) {
        return res.status(400).json({
            license: 'Warehouse license name already exists'
        });
    }

    const newWarehouse = new Warehouse({...body});
    const model = await newWarehouse.save();
    const createdWarehouse = changeWarehouseForResult(model,'license');
    return res.status(200).json(createdWarehouse);

};

exports.editWarehouse = async (req, res) => {
    const {body} = req;
    const dbWarehouse = await Warehouse.findOneAndUpdate({_id: req.params.id}, body, {new: true});

    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const model = await dbWarehouse.save();
    const editedWarehouse = changeWarehouseForResult(model,'license');
    return res.status(200).json(editedWarehouse);
};

exports.getWarehouses = async (req, res) => {
    const dbWarehouse = await Warehouse.find({company: req.user.company});
    const warehousesList = dbWarehouse.map((elem) => {
        return changeWarehouseForResult(elem,'license')
    });

    return res.status(200).json(warehousesList);
};

exports.getWarehouse = async (req, res) => {
    const dbWarehouse = await Warehouse.findById(req.params.id);
    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const foundWarehouse = changeWarehouseForResult(dbWarehouse,'license');
    return res.status(200).json(foundWarehouse);
};

exports.deleteWarehouse = async (req, res) => {
    const dbWarehouse = await Warehouse.findOne({license:req.params.id});
    const deletedWarehouse = await dbWarehouse.remove();
    const model = changeWarehouseForResult(deletedWarehouse,'license');
    return res.status(200).json(model);
};


