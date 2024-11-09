const moment = require('moment/moment');

class BaseUtils {
  today(value) {
    return value ? moment(value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
  }
  todayToMoment(value) {
    return value ? moment(value) : moment();
  }
}

module.exports = BaseUtils;