const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../../utils/sequelize')
const moment = require('moment');

class User extends Model {}

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        },
      }
    },
    // last_login: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    //   defaultValue: () => moment().format('YYYY-MM-DD'),
    //   set(value) {
    //     this.setDataValue('date', value ? moment(value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'));
    //   }
    // },
    // created_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // For MySQL
    // }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'last_login',

  }
);

module.exports = User;
