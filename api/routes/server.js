const express = require('express');
const route = express.Router();
const serverController = require('../controllers/server');

route.get('/health', serverController.healthCheck);

module.exports = route;
