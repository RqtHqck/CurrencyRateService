const { DataTypes } = require('sequelize');
const sequelize = require('../middlewares/sequelize')

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
    defaultValue: DataTypes.NOW,
  }
}, {
    timestamps: false,
    tableName: 'currencies',
  }
)


module.exports = Currency;