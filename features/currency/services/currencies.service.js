const Currency = require('../models/Currency'),
  logger = require('../../../utils/logger'),
  axios = require('axios'),
  moment = require('moment')


class CurrenciesService {

  static get today() {
    return moment().format('YYYY-MM-DD');
  }

  static getTodayCurrenciesFromDB = async () => {
    // return currencies for today or []
    try {
      let currencies = await Currency.findAll({ where: { date: CurrenciesService.today } });
      return currencies && currencies.length > 0 ? currencies : [];  // возвращаем currencies, если он не пустой, иначе []
    } catch (err) {
      logger.error('Error fetching today\'s currencies from database', err);
      return [];  // возвращаем пустой массив при ошибке
    }
  }

  static saveFromCurrenciesFromApiToDb = async () => {
    // Save retrieved data from API\
    try {
      const rates = await CurrenciesService.getCurrencyFromAPI(); // Take response from API

      let currencies = [];  // Arr for storing
      for( const [key, value] of Object.entries(rates) ) {
        currencies.push({ code: key, value: parseFloat(value) });  // Add obj-s to arr
      }

      await Currency.bulkCreate(currencies);  // Save to db
      // return res.status(201).json(currencies);  // return currencies
    } catch (err) {
      logger.error('Error:', err);
      throw new Error('Error during uploading new currencies to database.');
      // return res.status(500).json({ message: 'Error saving currencies to database', error: err.message })
    }
  }

  static  getCurrencyFromAPI = async () => {
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

  static checkTodayCurrenciesFromDb = async () => {
    const currencies = await CurrenciesService.getTodayCurrenciesFromDB(); // Get today currencies from db
    return currencies && currencies.length > 0;
  }

  static transferCurrency = (from, to) => {
    return (to / from);
  }

}

module.exports = CurrenciesService;