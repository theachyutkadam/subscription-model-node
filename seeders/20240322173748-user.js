'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Users', [
    {
      email: 'superAdmin@gmail.com',
      password: 'admin',
      role_id: 1,
      // deletedAt: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'admin@gmail.com',
      role_id: 2,
      password: '12345678',
      // deletedAt: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
