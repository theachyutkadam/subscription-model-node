'use strict';

/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');
const { plan, Sequelize } = require("./../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    // const plansList = [];
    // const types = plan.getAttributes().type.values
    // for (let i = 0; i < 10; i++) {
    //   const planSeedData = {
    //     name: faker.person.jobTitle(),
    //     price: faker.number.float({ min: 100, max: 5000, multipleOf: 0.02 }),
    //     is_active: faker.datatype.boolean(),
    //     type: types[Math.floor(Math.random()*types.length)],
    //     expire_at: faker.date.anytime(),
    //     description: "none",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   };
    //   plansList.push(planSeedData);
    //   console.log('------plan created-----------', i+1);
    // }
    // await queryInterface.bulkInsert('Plans', plansList, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plans', null, {});
  }
};
