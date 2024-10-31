const router = require('express').Router();
const controllers = require('../controllers/currency/currency')
const ValidateQueryParams = require('../middlewares/ValidateQueryParams')
const validate = new ValidateQueryParams();

// GET http://localhost:5000/api/currency/getAllCurrenciesByDate?date=date&ticket=ticket
router.get('/getAllCurrenciesByDate', validate.validateDate, controllers.getAllCurrenciesByDate)

// GET http://localhost:5000/api/currency/getCoupleCurrency?date=date&from=from&to=to
router.get('/getCoupleCurrency', validate.validateDate, validate.validateTicketName, controllers.getCoupleCurrency)

// GET http://localhost:5000/api/currency/saveCurrencyFreaks
router.get('/saveCurrencyFreaks', controllers.saveCurrencyFreaks)

module.exports = router;