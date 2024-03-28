'use strict';

/** @type {import('sequelize-cli').Migration} */
const {faker} = require('@faker-js/faker');
const models = require('./../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const subscriptionsList = [];
    const plans = [1,2,3,4,5,6]
    const users = [1,2,3,4,5,6]

    for (let i = 0; i < 10; i++) {
      const subscriptionSeedData = {
        plan_id: plans[Math.floor(Math.random()*plans.length)],
        user_id: users[Math.floor(Math.random()*users.length)],
        activation_date: faker.date.anytime(),
        expired_date: faker.date.anytime(),
        // plan_price: plan.price,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      subscriptionsList.push(subscriptionSeedData);
      console.log('------subscription created-----------', subscriptionSeedData);
    }
    await queryInterface.bulkInsert('Subscriptions', subscriptionsList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
