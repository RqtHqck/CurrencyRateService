const express = require('express'),
  router = express.Router(),
  currencyRoutes = require('./currencies.routes');

router.use('/currency', currencyRoutes);

module.exports = router;
