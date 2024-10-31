const getCurrencyFromAPI = require('./getCurrencyFromAPI');
const Currency = require('../../models/Currency');

module.exports.getAllCurrenciesByDate = async (req, res) => {
  const dateQueryParam = req.query.date;

  try {
    let currency;
    if (dateQueryParam) {
      currency = await Currency.findOne({ where: { created_at: dateQueryParam }});
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
  //
  const dateQueryParam = req.query.date;
  res.status(200).json({ message : "coming soon" });//
}


module.exports.getCurrencyFreaks = async (req, res) => {
    try {
      const response = await getCurrencyFromAPI();
      res.status(200).json(response);
    } catch (err) {
      // Обработка ошибки при получении тикетов валют со значениями со стороннего апи
    }
}
