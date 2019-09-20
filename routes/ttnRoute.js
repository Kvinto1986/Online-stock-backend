const express = require('express')
const TtnRouter = express.Router()
const { addTth, findTTNbyNumber, findTtn, findWirehousedTtn, finishStockDelivery,getAll,getByID,editTTN } = require("../controlles/ttnConttroles")
TtnRouter.post('/addTtn', addTth)
TtnRouter.post('/findTTNbyNumber', findTTNbyNumber)
TtnRouter.get(`/:ttnNumber`, findTtn)
TtnRouter.post(`/editTTN`, editTTN)
module.exports = TtnRouter
