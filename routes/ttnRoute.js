const express = require('express')
const TtnRouter = express.Router()
const { addTth, findTTNbyNumber, findTtn, findWirehousedTtn, finishStockDelivery } = require("../controlles/ttnConttroles")

TtnRouter.post('/addTtn', addTth)
TtnRouter.post('/findTTNbyNumber', findTTNbyNumber)
TtnRouter.get(`/:ttnNumber`, findTtn)
TtnRouter.get('/wirehousedTtn/:ttnNumber', findWirehousedTtn)
TtnRouter.post(`/finishStockDelivery`, finishStockDelivery)

module.exports = TtnRouter
