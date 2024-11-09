const { query, validationResult} = require('express-validator'),
  logger = require('@utils/logger'),
  CurrencyUtils = require('../utils/currencies.utils');


class ValidateQueryParams {
  static validateDate = () => {
    return [
      query('date', 'Incorrect value')
        .optional() // unnecessary query param
        .isISO8601().withMessage('Date have to be in format YYYY-MM-DD')
        .custom((value, { req }) => {
          if (value && CurrencyUtils.todayToMoment(value).isAfter(CurrencyUtils.todayToMoment(CurrencyUtils.today()))) {
            logger.info('Date parameter should be today or less then today date')
            throw new Error('Date parameter should be today or less than today date');
          } return true;
      }),
      this.handleValidationErrors
    ];
  }

  static validateTicketName = () => {
    return [
      query(['ticket', 'from', 'to'], 'Incorrect value')
        .optional()
        .isString()
        .isIn(['EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'])
        .withMessage('Ticket must be one of: EUR, BYN, RUB, JPY, KZT, CNY, AUD, GBP'),
      this.handleValidationErrors
    ];
  }

  static validateTicketFromTo = () => {
    return [
      query(['from', 'to'], 'Incorrect value')
        .custom((value, { req }) => {
          const {from, to} = req.query;
          if (!from || !to) {
            throw new Error("Both 'from' and 'to' tokens must be provided.");
          }
          if (from === to) {
            throw new Error("Tokens 'from' and 'to' cannot be the same.");
          }
          return true;  // Если проверка прошла успешно, возвращаем true
        }),
      this.handleValidationErrors
    ];
  }

  static handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation errors:', errors.array()); // Добавлено логирование
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

}

module.exports = ValidateQueryParams;