const router = require('express').Router();
const controllers = require('../controllers/currency')

// GET http://localhost:5000/api/currency/checkCurrencyByDate
router.get('/checkCurrencyByDate', controllers.checkCurrencyByDate)

// GET http://localhost:5000/api/currency/getCurrencyFreaks
router.get('/getCurrencyFreaks', controllers.getCurrencyFreaks)

module.exports = router;