const axios = require('axios');

async function getCurrencyFromAPI() {
  // Get and filter response from third-party API https://api.currencyfreaks.com
  // ticketsRequired = ['EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP']
  try {
    const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ process.env.CURRENCY_FREAKS_API }&symbols=EUR,BYN,RUB,JPY,KZT,CNY,AUD,GBP`);

    if (response.status === 200) {
      const currencies = response['data']['rates'];
      return currencies
    } else {
      throw new Error(`Unexpected status while retrive data from third-party API: ${ response.status }`);
    }
  } catch (error) {
      console.error('Error fetching data from third-party API:', error);
      throw error;
  }
}

module.exports = getCurrencyFromAPI;
