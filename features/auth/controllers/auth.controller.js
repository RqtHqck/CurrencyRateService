const logger = require('../../../utils/logger'),
  User = require('../models/User')



class AuthController {

  static login = async (req, res) => {
    res.status(200).json({LOGIN: true})
  }

  static register = async (req, res) => {
    res.status(200).json({REGISTER: true})
  }
}

module.exports = AuthController;
