const express = require('express');
require('dotenv').config({path:'./config/.env'});
const bodyParser = require('body-parser');

// Routes 
const currency = require('./routes/currency');


const app = express();
// Config app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Routes
app.use('/api/currency', currency);


module.exports = app;