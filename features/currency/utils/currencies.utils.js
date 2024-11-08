const moment = require('moment')

class CurrencyUtils {
  static get today() {
    return moment().format('YYYY-MM-DD');
  }
}

module.exports = CurrencyUtils;