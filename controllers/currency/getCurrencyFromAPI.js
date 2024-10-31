const axios = require('axios');

async function getCurrencyFromAPI() {
  // Get and filter response from third-party API https://api.currencyfreaks.com
  const ticketsRequired = ['EUR', 'BYN', 'RUB', 'JPY', 'KZT', 'CNY', 'AUD', 'GBP']
  try {
    const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ process.env.CURRENCY_FREAKS_API }`);

    if (response.status === 200) {
      const currencies = response['data']['rates'];

      const filteredCurrencies = Object.keys(currencies)
        .filter( code => ticketsRequired.includes(code) )  // Filtered keys given
        .reduce( (obj, key) => {  // Return obj with filtered currencies
          obj[key] = currencies[key];
          return obj;
        }, {});

      return filteredCurrencies
    } else {
      throw new Error(`Unexpected status while retrive data from third-party API: ${ response.status }`);
    }
  } catch (error) {
      console.error('Error fetching data from third-party API:', error);
      throw error;
  }
}

module.exports = getCurrencyFromAPI;
