const express = require('express');
const route = express.Router();
const listing = require('../controllers/listing');

route.get('/view', listing.viewLists);
route.post('/add', listing.addListing);

module.exports = route;