const router = require('express').Router(),
  passport = require('passport')

const CurrenciesController = require('../controllers/currencies.controller');
const ValidateQueryParams = require('../validators/ValidateQueryParams');


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

// GET http://localhost:5000/api/currency/saveCurrenciesFreaks
// router.get(
//   '/saveCurrenciesFreaks',
//   CurrenciesController.saveFromCurrenciesFromApiToDb
// );

module.exports = router;
