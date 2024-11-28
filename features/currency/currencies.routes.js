const router = require('express').Router(),
  passport = require('passport'),
  CurrenciesController = require('./currencies.controller'),
  ValidateQueryParams = require('./currencies.validators');


// GET http://localhost:5000/api/currency/getCurrencies?date=date&ticket=ticket
router.get(
  '/getCurrencies',
  passport.authenticate('jwt', { session: false }),
  ValidateQueryParams.validateDate(),
  ValidateQueryParams.validateTicketName(),
  CurrenciesController.getCurrencies
);

// GET http://localhost:5000/api/currency/getCoupleCurrency?from=from&to=to
router.get(
  '/getCoupleCurrency',
  passport.authenticate('jwt', { session: false }),
  ValidateQueryParams.validateTicketName(),
  ValidateQueryParams.validateTicketFromTo(),
  CurrenciesController.getCoupleCurrency
);

module.exports = router;
