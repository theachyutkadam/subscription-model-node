'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Authorization.belongsTo(models.role, {
        foreignKey: 'role_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Authorization.init({
    path: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    can_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    can_write: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    can_update: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    can_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Authorization',
  });
  return Authorization;
};