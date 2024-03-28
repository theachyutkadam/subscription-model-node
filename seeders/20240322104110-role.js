'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'superAdmin',
        status: 0,
        description: 'demo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'admin',
        status: 1,
        description: 'demo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
