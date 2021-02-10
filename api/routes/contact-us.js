const express = require('express');
const route = express.Router();
const contactUs = require('../controllers/contact-us');

route.post('/contact', contactUs.contactMessage);

module.exports = route;
