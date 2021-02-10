const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    page_name: {
        type: String,
        required: true,
        trim: true
    },
    component_name: {
        type: String,
        required: true,
        trim: true
    },
    text_ar: {
        type: String,
        required: true,
        trim: true
    },
    text_en: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Language', languageSchema);