const TTN = require('../models/TtnModel');
const TTNOrder = require('../models/TtnImportModel');
const TTNExportOrder = require('../models/TtnExportModel');
const changeTTNForResult = require('../utils/objectNormalizer');
const moment = require('moment')

exports.createTTN = async (req, res) => {
    const {body} = req;

    const dbTTN = await TTN.findOne({number: body.number});
    if (dbTTN) {
        return res.status(400).json({
            number: 'TTN number name already exists'
        });
    }

    const dbTTNOrder = await TTNOrder.findOne({number: body.number});
    if (dbTTNOrder) {
        const dbTTNOrderModel = await TTNOrder.findOneAndUpdate({number: body.number}, {status: 'completed'}, {new: true});
        await dbTTNOrderModel.save();
    }

    body.products.forEach(elem => {
        elem.availableAmount = elem.amount;
        elem.type = elem.package
    });

    const newTTN = new TTN({...body});
    const model = await newTTN.save();
    const createdTTN = changeTTNForResult(model, 'number');
    return res.status(200).json(createdTTN);

};

exports.getTTN = async (req, res) => {
    const dbTTN = await TTN.findOne({number: req.params.id, warehouseCompany: req.user.company});

    if (!dbTTN) {
        return res.status(400).json({
            number: 'TTN not found'
        });
    }

    const foundTTN = changeTTNForResult(dbTTN, 'number');
    return res.status(200).json(foundTTN);
};

/* 
    # POST - getExportTTNs controller

    Request body:
    @ now - local client date

    Response:
    @ array of exported ttns
*/
exports.getExportTTNs = async (req, res) => {
    const dbTTN = await TTNExportOrder.find(
        {
            status: "pending",
            deadlineData: { 
                $gte: req.body.now
            }
        }, 
        {deadlineData: true}
    );

    return res.status(200).json(dbTTN);
}

/* 
    # POST - getEachDataOut controller

    Request body:
    @ clientDate - local client date
    @ substractedHoursAmount - represents how many hours should be a hour period

    Response:
    @ array of ttns with dates data
*/
exports.getEachDataOut = async (req, res) => {
    const { clientDate, substractedHoursAmount } = req.body;
    let subNowDate = new Date(clientDate)
    let dateIntetval

    if(substractedHoursAmount > 0) {
        subNowDate.setHours(subNowDate.getHours() + substractedHoursAmount);
        dateIntetval = {
            $gte: new Date(clientDate).toISOString(),
            $lte: subNowDate,
        }
    } else {
        dateIntetval = {
            $gte: subNowDate
        }
    }
    
    const dbTTN = await TTNExportOrder.find(
        {
            status: "pending",
            deadlineData: dateIntetval
        },
        {
            deadlineData: true, 
            dataOfRegistration: true, 
            number: true,
            carNumber: true
        }
    );

    for(let index = 0; index < dbTTN.length; index++) {
        let currentData = dbTTN[index]
        const now = moment(new Date(clientDate).toString()).format("DD/MM/YYYY HH:mm:ss")
        const then = moment(dbTTN[index].deadlineData.toString()).format("DD/MM/YYYY HH:mm:ss")
        const timeOutInDays = moment.duration(moment(then.toString(),"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).asDays()
        
        if (timeOutInDays > 1) {
            timeOut = `${Math.round(timeOutInDays)} days`
        } else { 
            timeOut = moment.utc(moment(then.toString(),"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
        }

        const isHotTask = Date.parse(`01/01/2011 ${timeOut}`) < Date.parse('01/01/2011 01:00:00')

        dbTTN[index] = {
            number: currentData.number,
            carNumber: currentData.carNumber,
            dateOfRegistration:  moment(currentData.dataOfRegistration).format('DD/MM/YYYY'),
            deadlineData: moment(dbTTN[index].deadlineData).format('DD/MM/YYYY'),
            timeOut,
            isHotTask,
        }
    }
    
    const getTimeOut = (timeOut) => {
        const now = new Date()
        return timeOut.indexOf('day') == -1
            ? Date.parse(`01/01/2011 ${timeOut}`)
            : now.setTime(now.getTime() + (timeOut.slice(0, timeOut.indexOf('day') - 1) * 24 * 60 * 60 * 1000))
    }

    const response = dbTTN.sort((a, b) => getTimeOut(a.timeOut) > getTimeOut(b.timeOut))

    return res.status(200).json(response);
}

exports.editTTN = async (req, res) => {
    const {body} = req;
    const dbTTN = await TTN.findOneAndUpdate({number: req.params.id}, body, {new: true});

    if (!dbTTN) {
        return res.status(400).json({
            ttn: 'TTN not found'
        });
    }

    const model = await dbTTN.save();
    const editedTTN = changeTTNForResult(model, 'number');
    return res.status(200).json(editedTTN);
};

exports.deleteTTN = async (req, res) => {
    const dbTTN = await TTN.findOne({number: req.params.id});
    const deletedTTN = await dbTTN.remove();
    const model = changeTTNForResult(deletedTTN, 'unp');
    return res.status(200).json(model);
};
