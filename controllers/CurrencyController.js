const Currency = require('../models/Currency');
const logger = require('../utils/logHandler');
const {Op} = require('sequelize');
const axios = require('axios');
const moment = require('moment');


class CurrencyController {

  static get today() {
    return moment().format('YYYY-MM-DD');
  }

  static getCurrencies = async (req, res) => {
    const dateQueryParam = req.query.date || null;  // take date query param
    const ticketQueryParam = req.query.ticket || null;  // take ticket query param
    logger.info('records exists')
    // Проверка есть ли за сегодня в бд записи
    let currencies = await CurrencyController.checkTodayRecords();

    if (currencies) {
      try {
        if (dateQueryParam && ticketQueryParam) {
          currencies = await Currency.findAll({ where: { [Op.and]: [{ date: dateQueryParam, code: ticketQueryParam }] }});  // date & ticket

        } else if (dateQueryParam) {
          currencies = await Currency.findAll({ where: { date: dateQueryParam }});  // date

        } else if (ticketQueryParam) {
          currencies = await Currency.findAll({ where: { code: ticketQueryParam } });  // ticket

        } else if (!ticketQueryParam && !dateQueryParam) {
          currencies = await Currency.findAll({ where: { date: CurrencyController.today } });  // today
        }

        if (currencies && currencies.length > 0) {
          return res.status(200).json(currencies);  // if data was in Db
        }
      } catch (err) {
      // Обработка ошибки при получении валюты
        logger.error('Error:', err);
        throw err; // или вы можете обработать это, вернув конкретный ответ об ошибке
      }
    } else {
      return res.status(500).json({ message: 'Error during request to Db'})
    }
  }

  static getCoupleCurrency = async (req, res) => {
    const from = req.query.from || null;
    const to = req.query.to || null;

    if (!from || !to || from === to) {
      return res.status(404).json({message: "Tokens 'from' and 'to' are not found or they are the same"});
    }
    // Проверка есть ли за сегодня в бд записи
    let currencies = await CurrencyController.checkTodayRecords();

    if (currencies) {
      try {
        const currencyFrom = await Currency.findOne({
          where: {
            [Op.and]: [{
              date: CurrencyController.today,
              code: from
            }]
          }
        });
        const currencyTo = await Currency.findOne({where: {[Op.and]: [{date: CurrencyController.today, code: to}]}});
        return res.status(200).json({
          from: from,
          to: to,
          exchange: CurrencyController.transferCurrency(currencyFrom.value, currencyTo.value)
        });
      } catch (err) {
        logger.error('Error:', err);
        throw err;
      }
    } else {
      return res.status(500).json({message: 'Error during request to Db'})
    }
  }

  static saveCurrencyFreaks = async (req, res) => {
    // Save retrieved data from API
    try {
      const response = await CurrencyController.getCurrencyFromAPI(); // Take response from API
      let currencies = [];  // Arr for storing

      for( const [key, value] of Object.entries(response) ) {
        currencies.push({ code: key, value: parseFloat(value) });  // Add obj-s to arr
      }

      if (currencies && currencies.length > 0) {
        await Currency.bulkCreate(currencies);  //
        return res.status(201).json(currencies);
      } else {
        return res.status(404).json({ message : 'Nothing saved' });
      }
    } catch (err) {
      logger.error("Error saving currencies:", err);
      return res.status(500).json({ message: 'Error saving currencies' });
      // Обработка ошибки при получении тикетов валют со значениями со стороннего апи
    }
  }

  static async getCurrencyFromAPI() {
    // Get and filter response from third-party API https://api.currencyfreaks.com
    // ticketsRequired - 'EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP'
    try {
      const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ process.env.CURRENCY_FREAKS_API }&symbols=EUR,BYN,RUB,JPY,KZT,CNY,AUD,GBP`);

      if (response && response.status === 200) {
        return response.data.rates;
      } else {
        throw new Error(`Unexpected status while retrieve data from third-party API: ${ response.status }`);
      }
    } catch (err) {
      logger.error('Error fetching data from third-party API:', err);
      throw err; // или вы можете обработать это, вернув конкретный ответ об ошибке
    }
  }

  static async checkTodayRecords() {
    try {
      let currencies = await Currency.findAll({ where: { date: CurrencyController.today } });
      if (!currencies &&  currencies.length === 0) {
        await CurrencyController.saveCurrencyFreaks();
        currencies = await Currency.findAll({ where: { date: CurrencyController.today } });
      }
    return currencies ? [currencies] : null;
    } catch (err) {
      logger.error('Error:', err);
      throw err;
    }
  }

  static transferCurrency = (from, to) => {
    return (to / from);
  }
}

module.exports = CurrencyController;



