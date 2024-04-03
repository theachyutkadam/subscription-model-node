'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authorizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      path: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id',
          as: 'role_id',
        }
      },
      can_read: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      can_write: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      can_update: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      can_delete: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Authorizations');
  }
};