const logger = require('@utils/logger'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  UserRepository = require('../repository/auth.repository')


class AuthService {

  static checkUserExists = async (email) => {
    const candidate = await UserRepository.findOne({ email });
    return candidate || false;
  }

  static saveNewUser = async (email, password, username) => {
    const hashedPassword = AuthService.generateHashedPassword(password);
    const user = AuthService.generateUser(email, hashedPassword, username);
    await UserRepository.save([ user ]);
  }

  static generateHashedPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static compareHashedPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateUser = ( email, password, username ) => {
    return { email, password, username }
  }

  static generateJwtToken = (candidate) => {
    const payloads = { email: candidate.email };
    return jwt.sign(payloads, process.env.SECRET_JWT_KEY, { expiresIn: 3600 });
  }
}

module.exports = AuthService