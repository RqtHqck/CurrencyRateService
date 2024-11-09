const logger = require('@utils/logger')

class AuthController {

  static login = async (req, res) => {

    res.status(200).json({LOGIN: true})
  }

  static register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;


    res.status(200).json({REGISTER: true})
  }
}

module.exports = AuthController;
