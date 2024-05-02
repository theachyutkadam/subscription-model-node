'use strict';
const {Model} = require('sequelize');
const Sequelize = require('sequelize');

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
      user.belongsTo(models.Company, {
        foreignKey: 'company_id',
        onDelete: 'CASCADE'
      }),
      user.hasOne(models.user_information, {
        foreignKey: 'user_id',
      }),
      user.hasMany(models.subscription, {
        foreignKey: 'user_id',
      }),
      user.hasMany(models.plan, {
        foreignKey: 'user_id',
      })
    }
  }
  user.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
      validate: {
        isEmail: { msg: "Please use a correct Email format - admin@gmail.com"},
        notEmpty: { msg: "Please provide Email"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a password' }
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a role' }
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a company' }
      }
    },
    status: {
      type:  Sequelize.ENUM('pending', 'active', 'inactive', 'deleted'),
      defaultValue: "pending"
    }
  }, {
    sequelize,
    modelName: 'user',
    paranoid: true,
    deletedAt: 'deletedAt',
    indexes: [
      {
        unique: true,
        fields: ["email"]
      }
    ],
    primary_key: [user.role_id, user.company_id]
  });

  return user;
};
