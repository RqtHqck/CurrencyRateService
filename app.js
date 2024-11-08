require('dotenv').config({path:'./config/.env'});
const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  compression = require('compression'),
  helmet = require('helmet');
// UTILS
const logger = require('./utils/logger'),
  sequelize = require('./utils/sequelize'),
  scheduleTasks = require('./utils/nodeCron'),
  limiter = require('./utils/limiter');

const app = express();
// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));
app.use(compression());  // Response compression by different types 
app.use(helmet()); // Defense from the XSS attacks
app.use(limiter);
scheduleTasks();

// Routes
const apiRoutes = require('./features/currency/routes/index');
app.use('/api', apiRoutes);

module.exports = app;