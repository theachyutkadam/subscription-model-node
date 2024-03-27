'use strict';

/** @type {import('sequelize-cli').Migration} */
// var faker = require("faker");
import { faker } from '@faker-js/faker';

module.exports = {
  async up (queryInterface, Sequelize) {
    const usersList = [];
    for (let i = 0; i < 100; i++) {
      usersList.push(setupUserPayload());
    }
    await queryInterface.bulkInsert('Users', usersList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },

  async setupUserPayload(){
    const userSeedData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      role_id: [0,1,2,3].random(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return userSeedData
  }
};
