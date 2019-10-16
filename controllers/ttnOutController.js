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

    let boolFind = true;
    let warehouseError = '';

    ttnProductsArray.forEach(elem => {
        if (!warehouseProductsArray.includes(elem)) {
            bool = false;
            warehouseError = `No product data found in warehouse, error in ttn №${JSON.parse(elem).ttn}, product: ${JSON.parse(elem).name}`
        }
    });

    if (!boolFind) {
        return res.status(400).json({
            error: warehouseError
        })
    }

    const productsArray = [];
    ttnProducts.forEach(ttnProduct => {
        const currentProductArray = [];
        warehouseAreas.forEach((area, areaIndex) => {
            if (area.products.length > 0) {
                area.products.forEach((product, productIndex) => {
                    if (ttnProduct.ttnNumber === product.ttnNumber && ttnProduct.name === product.name) {
                        const productObject = {
                            name: ttnProduct.name,
                            ttnNumber: ttnProduct.ttnNumber,
                            areaIndex: areaIndex,
                            productIndex: productIndex,
                            amount: product.amount,
                            size: product.size
                        };
                        currentProductArray.push(productObject)
                    }
                })
            }
        });
        productsArray.push(currentProductArray)
    });

    const sortedProductsArray = productsArray.map(elem => {
        return elem.sort(function (a, b) {
            return a.amount - b.amount
        });
    });

    const totalProductsOnWarehouse = productsArray.map(elem => {
        return elem.reduce((sum, current) => sum + current.amount, 0);
    });

    let boolAmount = true;
    let amountError = '';

    ttnProducts.forEach((ttnProduct, index) => {
        if (ttnProduct.amount > totalProductsOnWarehouse[index]) {
            boolAmount = false;
            amountError = `The warehouse contains less than declared products, or not correct TTN number or product name in TTN №${ttnProduct.ttnNumber}, product: ${ttnProduct.name}`
        }
    });

    if (!boolAmount) {
        return res.status(400).json({
            error: amountError
        })
    }

    ttnProducts.forEach((ttnProduct, index) => {
        let productBalance = ttnProduct.amount;
        sortedProductsArray[index].forEach(product => {
            if (product.amount > productBalance) {
                const coefficient = product.size / product.amount;
                const ttnProductArea = Math.round(productBalance * coefficient);
                product.amount -= productBalance;
                product.size -= ttnProductArea;
                warehouseAreas[product.areaIndex].freeArea += ttnProductArea;
                dbWarehouse.freeArea += ttnProductArea;
                productBalance = 0
            }
            if (product.amount <= productBalance) {
                warehouseAreas[product.areaIndex].freeArea += product.size;
                dbWarehouse.freeArea += product.size;
                productBalance -= product.amount;
                product.amount = 0;
                product.size = 0;
            }

        })
    });

    sortedProductsArray.forEach(products => {
        products.forEach(elem => {
            warehouseAreas[elem.areaIndex].products[elem.productIndex].amount = elem.amount;
            warehouseAreas[elem.areaIndex].products[elem.productIndex].size = elem.size;
        })
    });

    warehouseAreas.forEach(area => {
        return area.products.forEach((elem, index) => {
            if (elem.amount === 0) {
                area.products.splice(index, 1)
            }
        })
    });

    const newTTNOut = new TTNOut({...body});
    const TTNOutModel = await newTTNOut.save();
    const dbWarehouseModel = await Warehouse.findOneAndUpdate({license: warehouseID}, dbWarehouse, {new: true});
    await dbWarehouseModel.save();
    const createdTTN = changeTtnOutForResult(TTNOutModel, 'number');
    return res.status(200).json(createdTTN);
};