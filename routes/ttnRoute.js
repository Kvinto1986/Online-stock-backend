const express = require('express');
const TtnRouter = express.Router();
const TTN = require('../models/TtnModel');
const {addTth, findTTNbyNumber, editTTN, getAll, getByID,getByNumber} = require("../controlles/ttnConttroles");

TtnRouter.post('/', addTth)
TtnRouter.post('/findTTNbyNumber/', findTTNbyNumber)
TtnRouter.get('/', getAll)
TtnRouter.get('/:id', getByID)
TtnRouter.get('/getbyNumber/:number', getByNumber)
TtnRouter.put('/:id', editTTN)

TtnRouter.post('/edit', (req, res) => {
    if (req.user.position.includes('controller')) {

        TTN.findById(req.body.id).then(ttn => {
            ttn.status = 'checked';
            ttn.products = req.body.products;
            if (req.body.report.report.length > 0) {
                ttn.reports.push(req.body.report)
            }
            ttn.save();
            res.json(ttn)
        })


    } else return res.status(400).json({
        user: 'You do not have rights to this request'
    });
})


module.exports = TtnRouter