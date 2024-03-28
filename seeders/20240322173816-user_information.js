'use strict';

/** @type {import('sequelize-cli').Migration} */
const {faker} = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const userInformationsList = [];

    for (let i = 0; i < 10; i++) {
      const userInformationSeedData = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        contact: faker.datatype.number({ min: 1111111111, max: 9999999999 }),
        birth_date: faker.date.anytime(),
        gender: faker.datatype.number({ min: 0, max: 2 }),
        user_id: i+1,
        maritial_status: faker.datatype.number({ min: 0, max: 2 }),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      userInformationsList.push(userInformationSeedData);
      console.log('------userInformation created-----------', userInformationSeedData);
    }
    await queryInterface.bulkInsert('user_informations', userInformationsList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_informations', null, {});
  }
};
