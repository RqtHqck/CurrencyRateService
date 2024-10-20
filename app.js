const express = require('express');
require('dotenv').config({path:'./config/.env'});
const bodyParser = require('body-parser')

// Routes -------------------------------------------


const app = express();

module.exports = app