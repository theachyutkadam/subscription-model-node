'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a name' }
      }
    },
    status: {
      type: Sequelize.ENUM('pending', 'active', 'inactive', 'deleted'),
      defaultValue: "pending"
    },
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
    deletedAt: DataTypes.DATE,
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      isNumeric: true,
      validate: {
        notEmpty: { msg: 'Please provide a contact' },
        isNumeric: { msg: 'Allow numbers only' },
        len: {args: [6, 13], msg: "Contact should be in 6 to 13 digits"}
      }
    },
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    paranoid: true,
    deletedAt: 'deletedAt',
    indexes: [
      {
        unique: true,
        fields: ["email"]
      }
    ]
  });
  return Company;
};