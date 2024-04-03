'use strict';
const {Model} = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subscription.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      }),
      subscription.belongsTo(models.plan, {
        foreignKey: 'plan_id',
        onDelete: 'CASCADE'
      })
    }
  }
  subscription.init({
    user_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
    activation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a activation_date' },
        isDate: { msg: "Enter valid activation_date format" }
      }
    },
    expired_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a expired_date' },
        isDate: { msg: "Enter valid expired_date format" }
      }
    },
    plan_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a price' },
        isFloat: { msg: 'Enter price in float format' }
      }
    },
  }, {
    sequelize,
    modelName: 'subscription',
  });
  return subscription;
};
