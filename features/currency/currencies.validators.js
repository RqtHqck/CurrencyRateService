const BaseValidator = require('@utils/BaseValidator'); // Import base validator
const CurrencyUtils = require('./currencies.utils');
const { query } = require('express-validator');

class CurrenciesValidators extends BaseValidator {
  // Validate date query param
  static validateDate() {
    return [
      query('date', 'Incorrect value')
        .optional()
        .isISO8601().withMessage('Date must be in format YYYY-MM-DD')
        .custom((value, { req }) => {
          if (value && CurrencyUtils.todayToMoment(value).isAfter(CurrencyUtils.todayToMoment(CurrencyUtils.today()))) {
            logger.info('Date parameter should be today or less than today');
            throw new Error('Date parameter should be today or less than today');
          }
          return true;
        }),
      this.handleValidationErrors
    ];
  }

  // Validate ticket query params (ticket, from-to)
  static validateTicketName() {
    return [
      query(['ticket', 'from', 'to'], 'Incorrect value')
        .optional()
        .isString()
        .isIn(['EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'])
        .withMessage('Ticket must be one of: EUR, BYN, RUB, JPY, KZT, CNY, AUD, GBP'),
      this.handleValidationErrors
    ];
  }

  // Validate from and to tokens
  static validateTicketFromTo() {
    return [
      query(['from', 'to'], 'Incorrect value')
        .custom((value, { req }) => {
          const { from, to } = req.query;
          if (!from || !to) {
            throw new Error("Both 'from' and 'to' tokens must be provided.");
          }
          if (from === to) {
            throw new Error("Tokens 'from' and 'to' cannot be the same.");
          }
          return true;
        }),
      this.handleValidationErrors
    ];
  }
}

module.exports = CurrenciesValidators;
