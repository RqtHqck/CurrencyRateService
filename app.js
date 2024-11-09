require('dotenv').config({path:`./config/${ process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' }`});
const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  compression = require('compression'),
  helmet = require('helmet'),
  cors = require('cors');
// UTILS
const logger = require('./utils/logger'),
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
app.use(cors({ origin: true, methods: ['GET', 'POST'] }));
// app.use(cors({ origin: 'https://example.com' }));
scheduleTasks();

// Routes
const currencyRoutes = require('./features/currency/routes/index');
app.use('/api', currencyRoutes);
const authRoutes = require('./features/auth/routes/index');
app.use('/api', authRoutes);

module.exports = app;