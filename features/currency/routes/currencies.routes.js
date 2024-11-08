const router = require('express').Router();

const CurrenciesController = require('../controllers/currencies.controller');
const ValidateQueryParams = require('../../../middlewares/ValidateQueryParams');

// GET http://localhost:5000/api/currency/getCurrencies?date=date&ticket=ticket
router.get(
  '/getCurrencies',
  ValidateQueryParams.validateDate(),
  ValidateQueryParams.validateTicketName(),
  CurrenciesController.getCurrencies
);

// GET http://localhost:5000/api/currency/getCoupleCurrency?from=from&to=to
router.get(
  '/getCoupleCurrency',
  ValidateQueryParams.validateTicketName(),
  CurrenciesController.getCoupleCurrency
);

// GET http://localhost:5000/api/currency/saveCurrenciesFreaks
// router.get(
//   '/saveCurrenciesFreaks',
//   CurrenciesController.saveFromCurrenciesFromApiToDb
// );

module.exports = router;
