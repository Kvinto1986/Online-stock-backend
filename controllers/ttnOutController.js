const TTNOut = require('../models/TtnOutModel');
const TTN = require('../models/TtnModel');
const Warehouse = require('../models/WarehouseModel');
const changeTtnOutForResult = require('../utils/objectNormalizer');

exports.createTtn = async (req, res) => {
    const {body} = req;

    const dbTtnOut = await TTNOut.findOne({number: body.number});
    if (dbTtnOut) {
        return res.status(400).json({
            number: 'TTN number name already exists'
        });
    }

    const productTTN = body.products[0].ttnNumber;

    const dbTTN = await TTN.findOne({number: productTTN});

    if (!dbTTN) {
        return res.status(400).json({
            warehouse: `Warehouse not found`
        });
    }
    const warehouseID = dbTTN.warehouseID;

    const dbWarehouse = await Warehouse.findOne({license: warehouseID});
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
            warehouseProductsArray.push(JSON.stringify({ttn: product.ttnNumber, name: product.name})))
    });

    const ttnProductsArray = ttnProducts.map(elem => {
        return JSON.stringify({ttn: elem.ttnNumber, name: elem.name})
    });

    let bool = true;
    let warehouseError='';

    ttnProductsArray.forEach(elem => {
        if (!warehouseProductsArray.includes(elem)) {
            bool = false;
            warehouseError= `No product data found in warehouse, error in ttn №${JSON.parse(elem).ttn}, product: ${JSON.parse(elem).name}`
        }
    });

    if(!bool)
    return res.status(400).json({
        error: warehouseError
    });

    ttnProducts.forEach(ttnProduct => {
        warehouseAreas.map(area => {
            if (area.products.length > 0) {
                area.products.map((product,index) => {
                    if (ttnProduct.ttnNumber === product.ttnNumber && ttnProduct.name === product.name) {
                        if (product.amount < ttnProduct.amount) {
                            return res.status(400).json({
                                error: `The warehouse contains less than declared products TTN №${ttnProduct.ttnNumber}, product: ${ttnProduct.name}`
                            });
                        }
                        const coefficient = product.size / product.amount;
                        const ttnProductArea = Math.round(ttnProduct.amount * coefficient);
                        product.amount -= ttnProduct.amount;
                        area.freeArea += ttnProductArea;
                        if (product.amount === 0) {
                            product.size = 0;
                            area.products.splice(index,1)
                        } else product.size -= ttnProductArea;

                    }
                })
            }
        })
    });

        const newTTNOut = new TTNOut({...body});
        const TTNOutModel = await newTTNOut.save();
        const dbWarehouseModel = await Warehouse.findOneAndUpdate({license: warehouseID}, dbWarehouse, {new: true});
        const WarehouseModel = await dbWarehouseModel.save();
        const createdTTN = changeTtnOutForResult(TTNOutModel, 'number');
        return res.status(200).json(createdTTN);
};