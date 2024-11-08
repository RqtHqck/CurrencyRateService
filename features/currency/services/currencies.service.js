const logger = require('../../../utils/logger'),
  axios = require('axios'),
  CurrenciesUtils = require('../utils/currencies.utils'),
  {Op} = require('sequelize');
  CurrenciesRepository = require('../repository/currencies.repository');


class CurrenciesService extends CurrenciesUtils{

  static saveCurrencies = async () => {
    // Save retrieved data from third-party API to database
    try {
      const rates = await CurrenciesService.fetchCurrenciesFromApi(); // Take response from API

      let currencies = [];  // Arr for storing
      for( const [key, value] of Object.entries(rates) ) {
        currencies.push({ code: key, value: parseFloat(value) });  // Add obj-s to arr
      }

      await CurrenciesRepository.saveCurrencies(currencies);  // Save to db
    } catch (err) {
      logger.error('Error during saving new currencies to database:', err);
      throw new Error('Error during saving new currencies to database.');
    }
  }

  static fetchCurrenciesFromApi = async () => {
    // Get and filter response from third-party API https://api.currencyfreaks.com
    // ticketsRequired - 'EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'
    try {
      const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ process.env.CURRENCY_FREAKS_API }&symbols=EUR,BYN,RUB,JPY,KZT,CNY,AUD,GBP`);

      if (!response.data || !response.data.rates) {
        throw new Error('Unexpected response format from the API');
      }
      return response.data.rates;

    } catch (err) {
      logger.error('Error fetching data from the API', err);
      throw new Error(`Unexpected error while retrieving data from third-party API`);
    }
  }

  static checkOrRetrieveTodayCurrencies = async () => {
    try {
      const currencies = await CurrenciesRepository.filterCurrencies({date: this.today}); // Get today currencies from db
      if (!currencies && currencies.length === 0 ) {
        logger.info('No today currencies, take today currencies');
        await CurrenciesRepository.saveCurrencies(); // save to db
      }
    } catch (err) {
      logger.error('Unexpected error while retrieving checking is current API data exists', err);
      throw new Error(`Unexpected error while retrieving checking is current API data exists`);
    }
  }

  static transferCurrency = (from, to) => {
    return (to / from);
  }

  static getFilterCurrencies = async (params, endpoint) => {
    const filters = {};
    if (endpoint === 'getCurrencies') {
      // console.log(filters)
      if (params.date && params.ticket) {
        filters[Op.and] = [{date: params.date, code: params.ticket}]; // date && ticket

      } else if (params.date) {
        filters.date = params.date; // date

      } else if (params.ticket) {
        filters.code = params.ticket; // ticket

      } else {
        filters.date = this.today;

      }
    } else if (endpoint === 'getCoupleCurrency') {
      console.log(filters)
      if (params.from) {
        filters[Op.and] = [{date: this.today, code: params.from}];

      } else if (params.to) {
        filters[Op.and] = [{date: this.today, code: params.to}];

      }
    }

      return await CurrenciesRepository.filterCurrencies(filters);
  }
}

module.exports = CurrenciesService;