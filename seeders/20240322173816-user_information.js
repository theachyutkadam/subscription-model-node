'use strict';

/** @type {import('sequelize-cli').Migration} */
const {faker} = require('@faker-js/faker');
const { user_information, Sequelize } = require("./../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    const userInformationsList = [];
    const genders = user_information.getAttributes().gender.values
    const maritial_statuses = user_information.getAttributes().maritial_status.values

    for (let i = 0; i < 10; i++) {
      const userInformationSeedData = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        contact: faker.number.int({ min: 1111111111, max: 9999999999 }),
        birth_date: faker.date.anytime(),
        user_id: i+1,
        gender: genders[Math.floor(Math.random()*genders.length)],
        maritial_status: maritial_statuses[Math.floor(Math.random()*maritial_statuses.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      userInformationsList.push(userInformationSeedData);
      console.log('------userInformation created-----------', i+1);
    }
    await queryInterface.bulkInsert('user_informations', userInformationsList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_informations', null, {});
  }
};
