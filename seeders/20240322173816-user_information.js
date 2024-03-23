'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('user_informations', [
      {
        first_name: "achyut",
        last_name: "kadam",
        contact: "1234567890",
        birth_date: new Date(),
        gender: 1,
        user_id: 1,
        maritial_status: "0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: "sunchi",
        last_name: "ghule",
        contact: "9876543215",
        birth_date: new Date(),
        gender: 0,
        user_id: 2,
        maritial_status: "2",
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
    */
    await queryInterface.bulkDelete('user_informations', null, {});
  }
};
