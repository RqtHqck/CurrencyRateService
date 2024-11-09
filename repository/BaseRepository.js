const logger = require('../utils/logger');

class BaseRepository {
  constructor(model) {
    this.model = model
  }

  save = async (items) => {
    try {
      await this.model.bulkCreate(items);  // Save to db
    } catch (err) {
      logger.error('Error save to database', err);
      throw new Error('Error save to database');
    }
  }

  filter = async (filters) => {
    try {
      return await this.model.findAll({ where: filters });
    } catch (err) {
      logger.error('Error filter request from database', err);
      throw new Error('Error filter request from database');
    }
  }

}

module.exports = BaseRepository;