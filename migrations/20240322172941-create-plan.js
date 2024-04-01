'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      expire_at: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.ENUM('monthly', 'quarterly', 'yearly'),
        allowNull: false,
        defaultValue: 'monthly'
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      paranoid: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plans');
  }
};
