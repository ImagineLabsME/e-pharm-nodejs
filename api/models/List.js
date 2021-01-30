const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    medication_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    needed_by: {
        type: Date,
    }
});

module.exports = mongoose.model('Form', formSchema);