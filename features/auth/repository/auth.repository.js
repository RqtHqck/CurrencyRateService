const BaseRepository = require('../../../repository/BaseRepository'),
  User = require('../models/User')

class UserRepository {
  constructor() {
    Object.assign(this, new BaseRepository(User));
  }

}

const userRepository = new UserRepository();
module.exports = userRepository;