const express = require('express');
const TtnRouter = express.Router();
const TTN = require('../models/ttnModal');
const passport = require('passport');
require('../passport')(passport);
const {addTth, findTTNbyNumber, findTtn, getAll, getByID} = require("../controlles/ttnConttroles");

TtnRouter.post('/addTtn', addTth);
TtnRouter.post('/findTTNbyNumber', findTTNbyNumber);
//TtnRouter.get(`/:ttnNumber`, findTtn)
TtnRouter.get('/', getAll)
TtnRouter.get('/:id', getByID)

TtnRouter.post('/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.user.position.includes('controller')) {

        TTN.findById(req.body.id).then(ttn => {
            ttn.status = 'Checked';
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
