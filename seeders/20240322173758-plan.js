'use strict';

/** @type {import('sequelize-cli').Migration} */
// var faker = require("faker");
import { faker } from '@faker-js/faker';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    const plansList = [];
    for (let i = 0; i < 100; i++) {
      plansList.push(setupUserPayload());
    }
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
        description: "It's a Super saving data pack include 5 streaming platforms as well as one month free github membership",
        expire_at: new Date(),
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
  },

  async setupUserPayload(){
    const planSeedData = {
      name: faker.person.jobTitle(),
      price: faker.number.float({ min: 100, max: 1000, multipleOf: 0.02 }),
      is_active: [true, false].random(),
      type: ["monthaly", "yearly"].random(),
      description: "none",
      expire_at: faker.date.birthdate(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return planSeedData
  }
};
