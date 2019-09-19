const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
    adminId: {
        type: String,
        required: true
    },
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
    initialFreeArea: {
        type: Number,
        required: true
    },
    initialAreasState: {
        type: Array,
        required: true
    }
});

const Warehouse = mongoose.model('warehouses', WarehouseSchema);

module.exports = Warehouse;