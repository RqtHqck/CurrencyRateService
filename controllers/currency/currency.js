const getCurrencyFromAPI = require('./getCurrencyFromAPI');
const Currency = require('../../models/Currency');
const {logger} = require('sequelize/lib/utils/logger');
const {Op} = require('sequelize');

module.exports.getAllCurrenciesByDate = async (req, res) => {
  const dateQueryParam = req.query.date || null;
  const ticketQueryParam = req.query.ticket || null;
  const today = new Date();

  try {
    let currency;
    if (dateQueryParam) {
      // currency = await Currency.findAll({ where: {  created_at: dateQueryParam }});
      currency = await Currency.findAll({ where: { [Op.and]: [{created_at: dateQueryParam, currency_code: ticketQueryParam} ] } });
    } else {
      currency = await Currency.findOne();
    }

    if (currency) {
      res.status(200).json(currency);
    } else {
      const response = await getCurrencyFromAPI();
    }

  } catch (err) {
    // Обработка ошибки при получении валюты по дате
  }
}


module.exports.getCoupleCurrency = async (req, res) => {
  res.status(200).json();//
}


module.exports.saveCurrencyFreaks = async (req, res) => {
    try {
      const response = await getCurrencyFromAPI(); // Take response from API
      let currenciesArray = [];  // Arr for storing

      for( const [key, value] of Object.entries(response) ) {
        currenciesArray.push({ currency_code: key, currency_value: parseFloat(value) });  // Add obj-s to arr
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
