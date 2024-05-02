'use strict';

/** @type {import('sequelize-cli').Migration} */
const {faker} = require('@faker-js/faker');
const {Company, Sequelize} = require('./../models');

module.exports = {
  async up (queryInterface, Sequelize) {
  //   const companiesList = [];
  //   const statuses = Company.getAttributes().status.values
  //   for (let i = 0; i < 10; i++) {
  //     const comapnySeedData = {
  //       name: faker.company.name(),
  //       email: faker.internet.email(),
  //       status: statuses[Math.floor(Math.random()*statuses.length)],
  //       contact: faker.number.int({ min: 1111111111, max: 9999999999 }),
  //       address: faker.location.streetAddress(),
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     };
  //     companiesList.push(comapnySeedData);
  //     console.log('------company created-----------', i+1);
  //   }
  //   await queryInterface.bulkInsert('Companies', companiesList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
