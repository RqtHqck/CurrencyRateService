const logger = require('@utils/logger'),
  CurrenciesService = require('../services/currencies.service')


class CurrenciesController {

  static getCurrencies = async (req, res) => {
    const { date,  ticket } = req.query;  // take ticket query param
    logger.info('CurrenciesController::GET getCurrencies');
    try {
      await CurrenciesService.checkOrRetrieveTodayCurrencies();  // check today currencies
      const currencies = await CurrenciesService.getFilterCurrencies({date, ticket}, 'getCurrencies');

      return res.status(200).json(currencies);
    } catch (err) {
      // Обработка ошибки при получении валюты
      logger.error('Error:', err);
      return res.status(500).json({error: err});
    }
  }

  static getCoupleCurrency = async (req, res) => {
    const { from, to } = req.query;
    logger.info('CurrenciesController::GET getCoupleCurrency');

    try {
      await CurrenciesService.checkOrRetrieveTodayCurrencies();  // check today currencies

      const currencyFrom = await CurrenciesService.getFilterCurrencies({from}, 'getCoupleCurrency');
      const currencyTo = await CurrenciesService.getFilterCurrencies({to}, 'getCoupleCurrency');
      const transfered = CurrenciesService.transferCurrency(currencyFrom[0].value, currencyTo[0].value);

      return res.status(200).json({ from: from, to: to, exchange: transfered });
    } catch (err) {
      logger.error('Error:', err);
      return res.status(500).json({error: err});
    }
  }

}

module.exports = CurrenciesController;
