const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize')

const Currency = sequelize.define('Currency', {
  currency_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  currency_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency_value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // For MySQL
  }
}, {
    timestamps: false,
    tableName: 'currencies',
  }
)


module.exports = Currency;

0,31536148365137561