const BaseRepository = require('@repository/BaseRepository'),
  Currency = require('./currencies.model')

class CurrencyRepository extends BaseRepository {
  constructor() {
    super(Currency);
  }
}

const currencyRepository = new CurrencyRepository();
module.exports = currencyRepository;