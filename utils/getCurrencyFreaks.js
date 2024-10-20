const axios = require('axios');


async function getCurrencyFreaksAPI() {
  try {
    const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.CURRENCY_FREAKS_API}`);
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status: ${response.status}`);
    }
  } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
  }
}