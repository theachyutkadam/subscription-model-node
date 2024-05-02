'use strict';
const {Model} = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var today = new Date();
  class plan extends Model {
    static associate(models) {
      // define association here
      plan.hasMany(models.subscription, {
        foreignKey: 'plan_id',
      }),
      plan.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  plan.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a name' }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a price' },
        isFloat: { msg: 'Enter price in float format' }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: { msg: 'Please select a status' }
      }
    },
    user_id: DataTypes.INTEGER,
    expire_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a expire_at' },
        isDate: { msg: "Enter valid date format" },
        // isAfter: {
        //   args: today.setDate(today.getDate()+30),
        //   msg: "Date is related to plan"
        // }
        // isExpireAtMatchWithType(value) {
        //   if (value > today.setDate(today.getDate()+30) && this.type == "monthly") {
        //     throw new Error('You select a monthly plan and date should under 30 day.');
        //   }
        // }
      }
    },
    type: {
      type:  Sequelize.ENUM('monthly', 'quarterly', 'yearly'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['monthly', 'quarterly', 'yearly']],
          msg: 'Please select valid type'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      max: 200
    }
  }, {
    sequelize,
    modelName: 'plan',
  });
  return plan;
};
