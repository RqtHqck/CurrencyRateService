const router = require('express').Router();

const CurrencyController = require('../controllers/CurrencyController')
const ValidateQueryParams = require('../middlewares/ValidateQueryParams')
const currency = new CurrencyController();


// GET http://localhost:5000/api/currency/getAllCurrenciesByDate?date=date&ticket=ticket
router.get('/getAllCurrencies', ValidateQueryParams.validateDate, ValidateQueryParams.validateTicketName, currency.getAllCurrencies)

// GET http://localhost:5000/api/currency/getCoupleCurrency?date=date&from=from&to=to
router.get('/getCoupleCurrency', ValidateQueryParams.validateDate, ValidateQueryParams.validateTicketName, currency.getCoupleCurrency)

// GET http://localhost:5000/api/currency/saveCurrencyFreaks
router.get('/saveCurrencyFreaks', currency.saveCurrencyFreaks)

module.exports = router;