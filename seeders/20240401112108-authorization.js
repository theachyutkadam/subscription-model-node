'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authorizations', [
      {
        path: '/roles',
        role_id: 1,
        can_read: true,
        can_write: true,
        can_update: true,
        can_delete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        path: '/users',
        role_id: 2,
        can_read: true,
        can_write: true,
        can_update: true,
        can_delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authorizations', null, {});
  }
};
