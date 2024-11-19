const logger = require('@utils/logger'),
  AuthService = require('../services/auth.service'),
  jwt = require('jsonwebtoken');

class AuthController {

  static login = async (req, res) => {
    const { email, password } = req.body;
    const candidate = await AuthService.checkUserExists(email);

    if (candidate) {
      const passwordResult = AuthService.compareHashedPassword(password, candidate.password);
      if (passwordResult) {
        const token = AuthService.generateJwtToken(candidate);
        return res.status(200).send({ token:`Bearer ${token}` });
      } else {
        return res.status(401).json({message: 'Incorrect password'})
      }
    } else {
      return res.status(401).json({message: 'Incorrect email'})
    }
  }


  static register = async (req, res) => {
    const { email, password, username } = req.body;
    const candidate = await AuthService.checkUserExists(email);

    if (candidate) {
      return res.status(409).json({message:'This email is already exists'})
    }

    await AuthService.saveNewUser( email, password, username );
    return res.status(201).json({message: "User created successfully."});
  }
}

module.exports = AuthController;
