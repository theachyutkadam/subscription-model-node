'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Plans', [
      {
        name: "Family",
        price: 150.00,
        is_active: false,
        type: 0,
        expire_at: new Date(),
        description: "It's a family plan include 5 streaming platforms",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Super Saving",
        price: 1150.00,
        is_active: true,
        type: 1,
        expire_at: new Date(),
        description: "It's a Super saving data pack include 5 streaming platforms as well as one month free github membership",
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
     * await queryInterface.bulkDelete('Plan', null, {});
     */
    await queryInterface.bulkDelete('Plans', null, {});
  }
};
