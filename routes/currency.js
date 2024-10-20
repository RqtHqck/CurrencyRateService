const express = require('express');
const router = express.Router();
const controllers = require('../controllers/currency')

// GET http://localhost:5000/api/currency/checkCurrencyByDate
router.get('/checkCurrencyByDate', controllers.checkCurrencyByDate)

module.exports = router;