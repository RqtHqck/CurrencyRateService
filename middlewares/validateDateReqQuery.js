const { query, validationResult} = require('express-validator');

module.exports = [
  query('date', 'Incorrect value')
    .optional() // unnecessary query param
    .isISO8601().withMessage('Дата должна быть в формате YYYY-MM-DD'),

    (req, res, next) => {
      const errors = validationResult(req); // Collect all errors from validation chain
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];
