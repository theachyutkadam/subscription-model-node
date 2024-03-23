'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.role, {
        foreignKey: 'role_id',
        onDelete: 'CASCADE'
      }),
      user.hasMany(models.user_information, {
        foreignKey: 'user_id',
      }),
      user.hasMany(models.subscription, {
        foreignKey: 'user_id',
      })
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return user;
};