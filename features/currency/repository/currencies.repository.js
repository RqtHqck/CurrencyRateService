const BaseRepository = require('../../../repository/BaseRepository'),
  Currency = require('../models/Currency')

class CurrencyRepository extends BaseRepository {
  constructor() {
    super(Currency);
  }
}

const currencyRepository = new CurrencyRepository();
module.exports = currencyRepository;