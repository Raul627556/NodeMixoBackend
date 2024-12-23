const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    service: {
        alcohol: String,
        bib: String
    },
    price: {
        type: String,
        required: true
    },
    cardId: {
        type: String,
        required: true
    },
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
