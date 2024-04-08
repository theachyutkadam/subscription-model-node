'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'active', 'inactive', 'deleted'),
        allowNull: false,
        defaultValue: 'pending'
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
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      paranoid: true,
      uniqueKeys: {
        actions_unique: { fields: ['email'] }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
