const { body } = require('express-validator'),
  BaseValidator = require('@utils/BaseValidator'); // Import base validator

class BodyValidator extends BaseValidator {
  static validateUsername() {
    return [
      body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
      this.handleValidationErrors
    ];
  }

  static validateEmail() {
    return [
      body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
      this.handleValidationErrors
    ];
  }


  static validatePassword() {
    return [
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
      this.handleValidationErrors
    ];
  }
}

module.exports = BodyValidator;
