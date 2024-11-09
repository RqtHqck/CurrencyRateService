const router = require('express').Router(),
  AuthController = require('../controllers/auth.controller');

// GET http://localhost:port/api/auth/login
router.post(
  '/login',
  AuthController.login
);

// GET http://localhost:port/api/auth/register
router.post(
  '/register',
  AuthController.register
);

module.exports = router;
