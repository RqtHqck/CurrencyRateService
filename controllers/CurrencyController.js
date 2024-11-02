const Currency = require('../models/Currency');
const logger = require('../utils/logHandler');
const {Op} = require('sequelize');
const axios = require('axios');
const moment = require('moment');

module.exports = class CurrencyController {
  getAllCurrencies = async (req, res) => {
    const dateQueryParam = req.query.date || null;  // take date query param
    const ticketQueryParam = req.query.ticket || null;  // take ticket query param
    const today = moment().format('YYYY-MM-DD');  // create today date only for Db request

    try {
      let currencies;

      if (dateQueryParam && ticketQueryParam) {
        logger.info('dateQueryParam && ticketQueryParam')
        currencies = await Currency.findAll({ where: { [Op.and]: [{ date: dateQueryParam, code: ticketQueryParam }] }});  // date & ticket

      } else if (dateQueryParam) {
        logger.info('dateQueryParam')
        currencies = await Currency.findAll({ where: { date: dateQueryParam }}); // date

      } else if (ticketQueryParam) {
        logger.info('ticketQueryParam')
        currencies = await Currency.findAll({ where: { code: ticketQueryParam } });  // ticket

      } else if (!ticketQueryParam && !dateQueryParam) {
        logger.info('today')
        currencies = await Currency.findAll({ where: { date: today } });  // today
      }

      if (currencies && currencies.length > 0) {
        return res.status(200).json(currencies);  // if data was in Db
      }

      await this.saveCurrencyFreaks();  // Save data into Db
      const todayCurrencies = await Currency.findAll({ where: { date: today } });  // Take updated data
      logger.info('take today')
      todayCurrencies && todayCurrencies.length > 0 ? res.status(200).json(todayCurrencies) : res.status(500).json({ message: 'Error during request to Db'})
    } catch (err) {
      // Обработка ошибки при получении валюты по дате
    }
  }

  getCoupleCurrency = async (req, res) => {
    res.status(200).json(); //
  }

  saveCurrencyFreaks = async (req, res) => {
    try {
      const response = await this.getCurrencyFromAPI(); // Take response from API
      let currenciesArray = [];  // Arr for storing

      for( const [key, value] of Object.entries(response) ) {
        currenciesArray.push({ code: key, value: parseFloat(value) });  // Add obj-s to arr
      }

      if (currenciesArray.length > 0) {
        await Currency.bulkCreate(currenciesArray);
        res.status(201).json(currenciesArray);
      } else {
        res.status(404).json({ message : 'Nothing saved' });
      }
    } catch (err) {
      logger.error("Error saving currencies:", err);
      res.status(500).json({ message: 'Error saving currencies' });
      // Обработка ошибки при получении тикетов валют со значениями со стороннего апи
    }
  }

  getCurrencyFromAPI = async function() {
    // Get and filter response from third-party API https://api.currencyfreaks.com
    // ticketsRequired - 'EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'
    try {
      const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ process.env.CURRENCY_FREAKS_API }&symbols=EUR,BYN,RUB,JPY,KZT,CNY,AUD,GBP`);

      if (response && response.status === 200) {
        return response['data']['rates'];
      } else {
        throw new Error(`Unexpected status while retrieve data from third-party API: ${ response.status }`);
      }
    } catch (error) {
      logger.error('Error fetching data from third-party API:', error);
      throw error;
    }
  }
}



