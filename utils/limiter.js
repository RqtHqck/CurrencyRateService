const rateLimit = require('express-rate-limit');
limitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minuts
  max: 100, // 100 requests from one IP
};

module.exports = rateLimit(limitOptions);