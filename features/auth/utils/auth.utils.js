const BaseUtils = require('../../../utils/BaseUtils');

class AuthUtils {
  constructor() {
    Object.assign(this, new BaseUtils())
  }
}

const authUtils = new AuthUtils()
module.exports = authUtils;