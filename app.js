const express = require('express');
require('dotenv').config({path:'./config/.env'});
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logHandler');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const helmet = require('helmet');
const sequelize = require('./middlewares/sequelize.js');

const app = express();
// Config app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(compression());  // Response compression by different types 
app.use(helmet()); // Defense from the XSS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничение 100 запросов с одного IP
});
app.use(limiter);

// DB MYSQL
(async () => {
  try {
    await sequelize.authenticate();
    logger.info(`Succesfull connect to database mysql "${process.env.DB_NAME}"`);
  } catch (error) {
    logger.error(`Failed to connect to database "${process.env.DB_NAME}": ${error.message}`);
    console.error(`Error occurred when connecting to database "${process.env.DB_NAME}":`, error);
  }
})();

// Routes
const currency = require('./routes/currency');
app.use('/api/currency', currency);


module.exports = app;