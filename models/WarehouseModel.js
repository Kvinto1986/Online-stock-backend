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

    date: {
        type: Date,
        default: Date.now
    },

});

const Warehouse = mongoose.model('warehouses', WarehouseSchema);

module.exports = Warehouse;