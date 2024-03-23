'use strict';
const {Model} = require('sequelize');
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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    contact: DataTypes.STRING,
    birth_date: DataTypes.DATEONLY,
    gender: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    maritial_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_information',
  });
  return user_information;
};