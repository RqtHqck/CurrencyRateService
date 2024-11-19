require('dotenv').config({ path:`./config/${ process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' }` });
require('module-alias/register');

const express = require('express'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  morgan = require('morgan'),
  compression = require('compression'),
  helmet = require('helmet'),
  cors = require('cors');

// UTILS
const logger = require('@utils/logger'),
  scheduleTasks = require('@utils/nodeCron'),
  limiter = require('@utils/limiter');


const app = express();
// CONFIG APP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));
app.use(compression());  // Response compression by different types 
app.use(helmet()); // Defense from the XSS attacks
app.use(limiter);
app.use(cors({ origin: `http://localhost:${process.env.PORT}`, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type', 'Authorization'] }));
scheduleTasks();

// PASSPORT JWT
app.use(passport.initialize())
require('@utils/passport')(passport);

// ROUTES
const currencyRoutes = require('./features/currency/routes/index');
app.use('/api', currencyRoutes);
const authRoutes = require('./features/auth/routes/index');
app.use('/api', authRoutes);


module.exports = app;
