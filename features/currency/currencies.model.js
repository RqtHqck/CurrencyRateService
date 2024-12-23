const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('@utils/sequelize')
const CurrencyUtils = require('./currencies.utils');


class Currency extends Model {}

Currency.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: CurrencyUtils.today(),
      set(value) {
        this.setDataValue('date', CurrencyUtils.today(value));
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // For MySQL
    }
  }, {
  sequelize,
  modelName: 'Currency',
  tableName: 'currencies',
  timestamps: false,
  indexes: [
    {
      name: 'idx_date_code',
      fields: ['date', 'code'],
    },
    {
      name: 'idx_date',
      fields: ['date'],
    },
    {
      name: 'idx_code',
      fields: ['code']
    }
  ]
  }
);

module.exports = Currency;
