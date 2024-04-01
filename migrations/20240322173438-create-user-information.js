'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'transgender'),
        allowNull: false,
        defaultValue: 'male'
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'user_id',
        }
      },
      maritial_status: {
        type: Sequelize.ENUM('single', 'married', 'divorced', 'not discuess'),
        allowNull: false,
        defaultValue: 'single'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_informations');
  }
};
