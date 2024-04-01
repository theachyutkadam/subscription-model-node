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
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    is_active: DataTypes.BOOLEAN,
    expire_at: DataTypes.DATE,
    type: {
      type:  Sequelize.ENUM('monthly', 'quarterly', 'yearly'),
      defaultValue: "monthly"
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'plan',
  });
  return plan;
};
