const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize')

const Currency = sequelize.define('Currency', {
  currency_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  currency_code: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  currency_value: {
    type: DataTypes.DECIMAL(18, 8),
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
