const router = require('express').Router();
const controllers = require('../controllers/currency/currency')
const validateDateQuerry = require('../middlewares/validateDateReqQuery')

// GET http://localhost:5000/api/currency/getAllCurrenciesByDate?date=date&ticket=ticket
router.get('/getAllCurrenciesByDate', validateDateQuerry, controllers.getAllCurrenciesByDate)

// GET http://localhost:5000/api/currency/getCoupleCurrency?date=date&from=from&to=to
router.get('/getCoupleCurrency', validateDateQuerry, controllers.getCoupleCurrency)

router.get('/getCurrencyFreaks', controllers.getCurrencyFreaks)

module.exports = router;