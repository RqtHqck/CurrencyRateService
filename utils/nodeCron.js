const cron = require('node-cron');
// const currency = require('../routes/currency');

//  _________________ second ( optional )
// |  _______________ minute
// | |  _____________ hour
// | | |  ___________ day of month
// | | | |  _________ month
// | | | | |  _______ day of week
// | | | | | |
// * * * * * *
// Schedule tasks to be run on the server.
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
