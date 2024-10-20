const getCurrencyFreaksFromAPI = require('../utils/getCurrencyFreaks');

module.exports.checkCurrencyByDate = async (req, res) => {
  res.status(200).json({ 'message': 'checkCurrencyByDate' });
}

module.exports.getCurrencyFreaks = async (req,res) => {
  const response = await getCurrencyFreaksFromAPI();
  res.status(200).json(response);
}