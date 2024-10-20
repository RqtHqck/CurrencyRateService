const winston = require('winston');

// Конфигурация логгера
const logger = winston.createLogger({
  level: 'info', // минимальный уровень логирования
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      format: winston.format.json(),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  ],
  exitOnError: false, // Не завершать процесс при ошибке
});

// Поток для использования с morgan 
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

module.exports = logger;
