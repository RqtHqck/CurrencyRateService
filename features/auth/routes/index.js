const express = require('express'),
  router = express.Router(),
  authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);

module.exports = router;
