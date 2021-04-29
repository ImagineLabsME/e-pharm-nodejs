const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/db');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/public', express.static(__dirname + '/public'));

app.use('/api/listing', require('./api/routes/listing'));
app.use('/api', require('./api/routes/contact-us'));

app.use('/api/content/pages/', require('./api/routes/pages'));
app.use('/api/server', require('./api/routes/server'));

app.use((req, res, next) => {
    const error = new Error('404');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;