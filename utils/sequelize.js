const { Sequelize } = require('sequelize');
const logger = require('./logger')
const config = require('../config/config');

const environment = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[environment];

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  timezone: '+03:00',
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000
  },
  retry: {
    max: 3 // Количество попыток повторного подключения
  },
  logging: (msg) => logger.info(msg),   // Logging database requests
});

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(`Succesfull connect to database mysql "${process.env.DB_NAME}"`);
  } catch (error) {
    logger.error(`Failed to connect to database "${process.env.DB_NAME}": ${error.message}`);
    console.error(`Error occurred when connecting to database "${process.env.DB_NAME}":`, error);
  }
})();

module.exports = sequelize;
