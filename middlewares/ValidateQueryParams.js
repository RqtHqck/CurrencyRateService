const { query, validationResult} = require('express-validator');
const logger = require('../utils/logHandler');


class ValidateQueryParams {
  static validateDate = () => {
    return [
      query('date', 'Incorrect value')
        .optional() // unnecessary query param
        .isISO8601().withMessage('Date have to be in format YYYY-MM-DD'),
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
    ]
  }

  static handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info('Validation errors:', errors.array()); // Добавлено логирование
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

}

module.exports = ValidateQueryParams;