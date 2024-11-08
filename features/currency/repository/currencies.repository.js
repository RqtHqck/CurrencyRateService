const logger = require('../../../utils/logger'),
  Currency = require('../models/Currency'),
  CurrenciesUtils = require('../utils/currencies.utils')

class CurrencyRepository extends CurrenciesUtils {

  static saveCurrencies = async (currencies) => {
    try {
    await Currency.bulkCreate(currencies);  // Save to db
    } catch (err) {
      logger.error('Error save to database', err);
      throw new Error('Error save to database');
    }
  }

  static filterCurrencies = async (filters) => {
    console.log(filters)
    return await Currency.findAll({ where: filters });  // date & ticket
  }
}

module.exports = CurrencyRepository;