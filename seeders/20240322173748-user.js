'use strict';

/** @type {import('sequelize-cli').Migration}*/
const {faker} = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const usersList = [];
    const roles = [1,2]

    for (let i = 0; i < 10; i++) {
      const userSeedData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role_id: roles[Math.floor(Math.random()*roles.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      usersList.push(userSeedData);
      console.log('-----------------', i);
    }
    await queryInterface.bulkInsert('Users', usersList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },


};
