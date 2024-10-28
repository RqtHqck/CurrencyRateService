const router = require('express').Router();
const controllers = require('../controllers/currency/currency')

// GET http://localhost:5000/api/currency/checkCurrencyByDate?date=date
router.get('/checkCurrencyByDate', controllers.checkCurrencyByDate)

// GET http://localhost:5000/api/currency/getCurrencyFreaks?date=date&from=from&to=to
router.get('/getCurrencyFreaks', controllers.getCurrencyFreaks)

module.exports = router;