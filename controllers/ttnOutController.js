const TTN = require('../models/TtnOutModel');
const Warehouse = require('../models/WarehouseModel');
const changeTtnOutForResult = require('../utils/objectNormalizer');

exports.createTtn = async (req, res) => {
    const {body} = req;

    const dbTTN = await TTN.findOne({number: body.number});
    if (dbTTN) {
        return res.status(400).json({
            number: 'TTN number name already exists'
        });
    }

    const dbWarehouse = await Warehouse.findOne({license: body.warehouseLicense});
    if (!dbWarehouse) {
        return res.status(400).json({
            warehouse: 'Warehouse not found'
        });
    }

    const ttnProducts = body.products;
    const warehouseAreas = dbWarehouse.areas;
    const warehouseProductsArray = [];

    const warehouseProducts = warehouseAreas.filter(elem => elem.products);

    warehouseProducts.forEach(elem => {
        elem.products.forEach(product =>
            warehouseProductsArray.push(JSON.stringify({ttn: product.ttn, name: product.name})))
    });

    const ttnProductsArray = ttnProducts.map(elem => {
        return JSON.stringify({ttn: elem.ttnNumber, name: elem.name})
    });

    ttnProductsArray.forEach(elem => {
        if (!warehouseProductsArray.includes(elem)) {
            return res.status(400).json({
                error: `No product data found in warehouse, error in ttn №${JSON.parse(elem).ttn}, product: ${JSON.parse(elem).name}`
            });
        }
    });

    ttnProducts.forEach(ttnProduct => {
        warehouseAreas.map(area => {
            if (area.products) {
                area.products.map(product => {
                    if (ttnProduct.ttnNumber === product.ttn && ttnProduct.name === product.name) {
                        if (product.amount < ttnProduct.amount) {
                            return res.status(400).json({
                                error: `The warehouse contains less than declared products TTN №${ttnProduct.ttnNumber}, product: ${ttnProduct.name}`
                            });
                        }
                        const coefficient = product.area / product.amount;
                        const ttnProductArea = Math.round(ttnProduct.amount * coefficient);
                        product.amount -= ttnProduct.amount;
                        area.freeArea += ttnProductArea;
                        if (product.amount === 0) {
                            product.area = 0;
                        } else product.area -= ttnProductArea;

                    }
                })
            }
        })
    });

    const newTTN = new TTN({...body});
    const TTNModel = await newTTN.save();
    const dbWarehouseModel = await Warehouse.findOneAndUpdate({license: body.warehouseLicense}, dbWarehouse, {new: true});
    const WarehouseModel = await dbWarehouseModel.save();
    const createdTTN = changeTtnOutForResult(TTNModel, 'number');
    return res.status(200).json(createdTTN);
};