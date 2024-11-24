const logger = require('@utils/logger'),
  AuthService = require('../services/auth.service');

class AuthController {

  static login = async (req, res) => {
    const { email, password } = req.body;
    const candidate = await AuthService.checkUserExists(email);
    console.log(candidate);
    if (candidate) {
      const passwordResult = AuthService.compareHashedPassword(password, candidate.password);
      if (passwordResult) {
        const token = AuthService.generateJwtToken(candidate);
        return res.status(200).send({ token:`Bearer ${token}` });
      } else {
        return res.status(401).json({message: 'Incorrect password'})
      }
    } else {
      return res.status(401).json({message: 'Incorrect or not existing email'})
    }
  }


  static register = async (req, res) => {
    const { email, password, username } = req.body;
    const candidate = await AuthService.checkUserExists(email, username);
    if (candidate) {
      return res.status(409).json({message:'Email or username is already exists'})
    }

    await AuthService.saveNewUser( email, password, username );
    return res.status(201).json({message: "User created successfully."});
  }
}

module.exports = AuthController;
