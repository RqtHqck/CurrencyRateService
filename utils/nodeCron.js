const cron = require('node-cron');
//  _________________ second ( optional )
// |  _______________ minute
// | |  _____________ hour
// | | |  ___________ day of month
// | | | |  _________ month
// | | | | |  _______ day of week
// | | | | | |
// * * * * * * - each minute

module.exports = function sheduleCrone() {
  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });
};
