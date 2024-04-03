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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a name' }
      }
    },
    status: {
      type:  Sequelize.ENUM('pending', 'active', 'inactive', 'deleted'),
      validate: {
        isIn: {
          args: [['pending', 'active', 'inactive', 'deleted']],
          msg: 'Please set valid status'
        }
      },
      allowNull: false,
      defaultValue: "pending"
    },
    description: {
      type: DataTypes.TEXT,
      max: 200
    }
  }, {
    sequelize,
    modelName: 'role',
    paranoid: true,
    deletedAt: 'deletedAt'
  });
  return role;
};
