const router = require('express').Router(),
  AuthController = require('./auth.controller');
  BodyValidator = require('./auth.validators');

// GET http://localhost:port/api/auth/login
router.post(
  '/login',
  BodyValidator.validateEmail(),
  BodyValidator.validatePassword(),
  AuthController.login
);

// GET http://localhost:port/api/auth/register
router.post(
  '/register',
  BodyValidator.validateUsername(),
  BodyValidator.validateEmail(),
  BodyValidator.validatePassword(),
  AuthController.register
);

module.exports = router;
