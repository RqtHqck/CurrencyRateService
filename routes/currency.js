const router = require('express').Router();

const CurrencyController = require('../controllers/CurrencyController')
const ValidateQueryParams = require('../middlewares/ValidateQueryParams')

// GET http://localhost:5000/api/currency/getCurrencies?date=date&ticket=ticket
router.get('/getCurrencies', ValidateQueryParams.validateDate(), ValidateQueryParams.validateTicketName(), CurrencyController.getCurrencies)

// GET http://localhost:5000/api/currency/getCoupleCurrency?from=from&to=to
router.get('/getCoupleCurrency', ValidateQueryParams.validateTicketName(), CurrencyController.getCoupleCurrency)

// GET http://localhost:5000/api/currency/saveCurrencyFreaks
router.get('/saveCurrencyFreaks', CurrencyController.saveCurrencyFreaks)

module.exports = router;