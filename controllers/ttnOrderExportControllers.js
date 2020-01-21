const TTNOrder = require('../models/TtnExportModel');
const Warehouse = require('../models/WarehouseModel');
const changeTtnOrderForResult = require('../utils/objectNormalizer');
const moment = require('moment');

exports.createOrder = async (req, res) => {
    const {body} = req;

    const dbTTNOrder = await TTNOrder.findOne({number: body.number});
    if (dbTTNOrder) {
        return res.status(400).json({
            number: 'TTN number name already exists'
        });
    }


    const dbWarehouse = await Warehouse.findOne({license: body.warehouseLicense});
    if (!dbWarehouse) {
        return res.status(400).json({
            error: 'Warehouse not found'
        });
    }

    body.cargo.forEach((cargo) => {
        dbWarehouse.areas.forEach(elem => {
            elem.products.forEach(product => {
                if (product.id === cargo.id) {
                    product.availableAmount -= cargo.amount
                }
            })
        })
    });

    const newTTNOrder = new TTNOrder({...body});
    const TTNOrderModel = await newTTNOrder.save();
    const dbWarehouseModel = await Warehouse.findOneAndUpdate({license: body.warehouseLicense}, dbWarehouse, {new: true});
    await dbWarehouseModel.save();
    const createdTTN = changeTtnOrderForResult(TTNOrderModel, 'number');
    return res.status(200).json(createdTTN);
};

exports.getOrder = async (req, res) => {
    const dbTtnOrders = await TTNOrder.findOne({number: req.params.id});
    if (!dbTtnOrders) {
        return res.status(400).json({
            order: 'There\'s no such TTN (you can create the data yourself)'
        });
    }

    if (dbTtnOrders.status !== 'pending') {
        return res.status(400).json({
            order: `Order status: ${dbTtnOrders.status}`
        });
    }

    const orders = changeTtnOrderForResult(dbTtnOrders, 'number');
    return res.status(200).json(orders);
};

/*
    Request body:
    @ data            [Array]   - task list
    @ sortByFieldName [String]  - sorted field
    @ isDesc          [Boolean] - is DESC-based sort or ASC-based

    Response:
    @ response        [Array]   - sorted task list
*/
exports.taskTableSorter = (req, res) => {
    const { data, sortByFieldName, isDesc } = req.body;
    let response
    // console.log(sortByFieldName);
    
    switch (sortByFieldName) {
        case 'timeOut':
            response = dataSorterByDate(data, sortByFieldName, isDesc, false);
            break;
        case 'deadlineData':
            response = dataSorterByDate(data, sortByFieldName, isDesc, true);
            break;
        case 'dateOfRegistration':
            response = dataSorterByDate(data, sortByFieldName, isDesc, true);
            break;
        default:
            response = data;
            break;
    }

    return res.status(200).json({response, isDesc});
};

//  Sub-functions  //
/*
    taskTableSorter - dataSorterByDate

    Params:
    @ data            [Array]   - task list
    @ sortByFieldName [String]  - db field name
    @ isDesc          [Boolean] - is DESC-based sort or ASC-based
    @ isMonthFormat    [Boolean] - is date consits a month

    Return:
    @ [Array] - sorted array of ttns with dates data
*/
const dataSorterByDate = (data, sortByFieldName, isDesc, isMonthFormat) => {
    const getTimeFromMomentDate = (momentDate) => {
        return moment(momentDate, "DD/MM/YYYY").toDate().getTime()
    }

    if (isMonthFormat) {
        return data.sort((a, b) => isDesc
            ? getTimeFromMomentDate(a[sortByFieldName]) < getTimeFromMomentDate(b[sortByFieldName])
            : getTimeFromMomentDate(a[sortByFieldName]) > getTimeFromMomentDate(b[sortByFieldName])
        )
    } else {
        return data.sort((a, b) => isDesc
            ? Date.parse(`01/01/2011 ${a[sortByFieldName]}`) < Date.parse(`01/01/2011 ${b[sortByFieldName]}`)
            : Date.parse(`01/01/2011 ${a[sortByFieldName]}`) > Date.parse(`01/01/2011 ${b[sortByFieldName]}`)
        )
    }
};