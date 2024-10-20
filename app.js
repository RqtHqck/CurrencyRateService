const express = require('express');
require('dotenv').config({path:'./config/.env'});
const bodyParser = require('body-parser');
const winston = require('winston');
const morgan = require('morgan');
const logger = require('./utils/loggingHandler')


const app = express();
// Config app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', { 'stream': logger.stream }));
// Routes
const currency = require('./routes/currency');
app.use('/api/currency', currency);


module.exports = app;