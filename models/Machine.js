const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    localization: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        required: true
    },
    category: {
        type: String,
        enum: ['club', 'office', 'factory'],
        required: true
    },
    version: {
        type: String,
        required: true
    }
});

const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
