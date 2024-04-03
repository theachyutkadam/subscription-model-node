'use strict';
const {Model} = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_information.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  user_information.init({
    user_id: DataTypes.INTEGER,
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a first_name' }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a last_name' }
      }
    },
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
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please provide a birth_date' },
        isDate: { msg: "Enter valid birth_date format" }
      }
    },
    maritial_status: {
      type:  Sequelize.ENUM('single', 'married', 'divorced', 'not discuess'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['single', 'married', 'divorced', 'not discuess']],
          msg: 'Please select valid maritial_status'
        }
      }
    },
    gender: {
      type:  Sequelize.ENUM('male', 'female', 'transgender'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['male', 'female', 'transgender']],
          msg: 'Please select valid gender'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user_information',
  });
  return user_information;
};
