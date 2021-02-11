const express = require('express');
const route = express.Router();
const pages = require('../controllers/pages');

route.get('/', pages.page);

module.exports = route;