'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plan.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    is_active: DataTypes.BOOLEAN,
    expire_at: DataTypes.DATE,
    type: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'plan',
  });
  return plan;
};