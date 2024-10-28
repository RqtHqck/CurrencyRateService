const { Sequelize } = require('sequelize');
const logger = require('../utils/logHandler')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
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



module.exports = sequelize;
