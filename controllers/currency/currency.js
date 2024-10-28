const getCurrencyFromAPI = require('./getCurrencyFromAPI');
const Currency = require('../../models/Currency');

module.exports.checkCurrencyByDate = async (req, res) => {
  await Currency.sync();
  res.status(200).json({ 'message': 'checkCurrencyByDate' });
}

module.exports.getCurrencyFreaks = async (req,res) => {
  const response = await getCurrencyFromAPI();
  res.status(200).json(response);
}