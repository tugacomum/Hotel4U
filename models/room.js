const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    hotelId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    rentperday: {
        type: Number,
        required: true,
    },
    imageurls: [],
    currentbookings: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    services: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;