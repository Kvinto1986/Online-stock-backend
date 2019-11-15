const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    totalArea: {
        type: Number,
        required: true
    },
    areas: {
        type: Array,
        required: true
    },

    company: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    initialFreeArea: {
        type: Number,
        default: 0
    },
    initialAreasState: {
        type: Array,
    },
    freeArea: {
        type: Number,
        required: true
    },
    GPS: {
        type: Object,
        required: true
    },
    address:{
        type:'String',
        required: true
    },
});

const Warehouse = mongoose.model('warehouses', WarehouseSchema);

module.exports = Warehouse;