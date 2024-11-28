const BaseRepository = require('@repository/BaseRepository'),
  User = require('./auth.model');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;