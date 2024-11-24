const { validationResult } = require('express-validator');
const logger = require('@utils/logger');

class BaseValidator {
  // Method to handle validation errors
  static handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

module.exports = BaseValidator;
