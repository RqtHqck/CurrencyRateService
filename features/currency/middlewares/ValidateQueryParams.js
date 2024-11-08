const { query, validationResult} = require('express-validator'),
  logger = require('../../../utils/logger'),
  CurrenciesService = require('../services/currencies.service');
  moment = require('moment')


class ValidateQueryParams {
  static validateDate = () => {
    return [
      query('date', 'Incorrect value')
        .optional() // unnecessary query param
        .isISO8601().withMessage('Date have to be in format YYYY-MM-DD')
        .custom((value, {req, res}) => {
          if (moment(value).isAfter(CurrenciesService.today)) {
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
    ]
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