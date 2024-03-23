'use strict';
const {Model} = require('sequelize');
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
    activation_date: DataTypes.DATE,
    expired_date: DataTypes.DATE,
    plan_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'subscription',
  });
  return subscription;
};