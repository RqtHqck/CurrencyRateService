const { query, validationResult} = require('express-validator');


module.exports = class ValidateQueryParams {
  static validateDate = [
    query('date', 'Incorrect value')
      .optional() // unnecessary query param
      .isISO8601().withMessage('Date have to be in format YYYY-MM-DD'),

    (req, res, next) => {
      const errors = validationResult(req); // Collect all errors from validation chain
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  static validateTicketName = [
    query('ticket', 'Incorrect value')
      .optional()
      .isString()
      .isIn(['EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'])
      .withMessage('Ticket must be one of: EUR, BYN, RUB, JPY, KZT, CNY, AUD, GBP'),

    (req, res, next) => {
      const errors = validationResult(req); // Collect all errors from validation chain
      if (!errors.isEmpty()) {
        // Обработать ошибку квери параметра
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
}
