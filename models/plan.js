'use strict';
const {Model} = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      plan.hasMany(models.subscription, {
        foreignKey: 'plan_id',
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
    expire_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a expire_at' },
        isDate: { msg: "Enter valid date format" }
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
