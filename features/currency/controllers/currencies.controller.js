const Currency = require('../models/Currency'),
  logger = require('../../../utils/logger'),
  {Op} = require('sequelize'),
  CurrenciesService = require('../services/currencies.service');


class CurrenciesController {

  static getCurrencies = async (req, res) => {
    const dateQueryParam = req.query.date || null;  // take date query param
    const ticketQueryParam = req.query.ticket || null;  // take ticket query param
    logger.info('GetCurrencies')

    let currencies = await CurrenciesService.checkTodayCurrenciesFromDb();  // check today currencies
    if (!currencies) {
      logger.info('No currencies found');
      // No today currencies, take today currencies
      await CurrenciesService.saveFromCurrenciesFromApiToDb(); // save to db
      currencies = await CurrenciesService.getTodayCurrenciesFromDB(); // take from db
    }

    try {
      if (dateQueryParam && ticketQueryParam) {
        logger.info(`dateQueryParam: ${dateQueryParam}, ticketQueryParam: ${ticketQueryParam}`);
        currencies = await Currency.findAll({ where: { [Op.and]: [{ date: dateQueryParam, code: ticketQueryParam }] }});  // date & ticket

      } else if (dateQueryParam) {
        logger.info(`dateQueryParam: ${dateQueryParam}`);
        currencies = await Currency.findAll({ where: { date: dateQueryParam }});  // date

      } else if (ticketQueryParam) {
        logger.info(`ticketQueryParam: ${ticketQueryParam}`);
        currencies = await Currency.findAll({ where: { code: ticketQueryParam } });  // ticket

      } else if (!ticketQueryParam && !dateQueryParam) {
        logger.info('Today currencies');
        currencies = await CurrenciesService.getTodayCurrenciesFromDB()  // today
      }

      return res.status(200).json(currencies);

    } catch (err) {
      // Обработка ошибки при получении валюты
      logger.error('Error:', err);
      throw err; // или вы можете обработать это, вернув конкретный ответ об ошибке
    }
  }

  static getCoupleCurrency = async (req, res) => {
    const from = req.query.from || null;
    const to = req.query.to || null;

    if (!from || !to || from === to) {
      logger.info('No such token had had given');
      return res.status(404).json({message: "Tokens 'from' and 'to' are not found or they are the same"});
    }
    // Проверка есть ли записи за сегодня в бд
    let currencies = await CurrenciesService.checkTodayCurrenciesFromDb();

    if (!currencies) {
      logger.info('No today currencies, take today currencies');
      await CurrenciesService.saveFromCurrenciesFromApiToDb(); // save to db
    }

    try {
      const currencyFrom = await Currency.findOne({ where: { [Op.and]: [{ date: CurrenciesService.today, code: from }] } });
      const currencyTo = await Currency.findOne({where: {[Op.and]: [{date: CurrenciesService.today, code: to}]}});
      return res.status(200).json({ from: from, to: to, exchange: CurrenciesService.transferCurrency(currencyFrom.value, currencyTo.value) });
    } catch (err) {
      logger.error('Error:', err);
      return res.status(500).json({error: err});
    }
  }

}

module.exports = CurrenciesController;
