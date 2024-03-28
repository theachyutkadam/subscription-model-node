'use strict';

/** @type {import('sequelize-cli').Migration} */
const {faker} = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const plansList = [];
    for (let i = 0; i < 10; i++) {
      const planSeedData = {
        name: faker.person.jobTitle(),
        price: faker.number.float({ min: 100, max: 5000, multipleOf: 0.02 }),
        is_active: faker.datatype.boolean(),
        type: faker.datatype.number({ max: 3 }),
        expire_at: faker.date.anytime(),
        description: "none",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      plansList.push(planSeedData);
      console.log('------plan created-----------', planSeedData);
    }
    await queryInterface.bulkInsert('Plans', plansList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plans', null, {});
  }
};
