const moment = require('moment');

class BaseUtils {
  today(value) {
    return value ? moment(value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
  }
  todayToMoment(value) {
    return value ? moment(value) : moment();  // date to moment object convert or take date now with moment()
  }
}

module.exports = BaseUtils;