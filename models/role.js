'use strict';
const {Model} = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.hasMany(models.user, {
        foreignKey: 'role_id',
      }),
      role.hasOne(models.Authorization, {
        foreignKey: 'role_id',
      })
    }
  }
  role.init({
    name: DataTypes.STRING,
    // status: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: {
      type:  Sequelize.ENUM('pending', 'active', 'inactive', 'deleted'),
      defaultValue: "pending"
    }
  }, {
    sequelize,
    modelName: 'role',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return role;
};
