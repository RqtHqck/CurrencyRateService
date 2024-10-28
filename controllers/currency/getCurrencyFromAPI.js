const axios = require('axios');


async function getCurrencyFromAPI() {
  try {
    const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ process.env.CURRENCY_FREAKS_API }`);
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status while retrive data from third-party API: ${ response.status }`);
    }
  } catch (error) {
      console.error('Error fetching data from third-party API:', error);
      throw error;
  }
}

module.exports = getCurrencyFromAPI;
