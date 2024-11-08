const { createLogger, format, transports } = require('winston');

// Конфигурация логгера
const logger = createLogger({
  level: 'info', // минимальный уровень логирования
  format: format.combine(
    format.timestamp(),
    format.json() // Формат логов в JSON
  ),
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      format: format.json(),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.simple()
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
