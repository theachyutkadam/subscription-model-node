'use strict';

/** @type {import('sequelize-cli').Migration}*/
const {faker} = require('@faker-js/faker');
const { user, Sequelize } = require("./../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    const usersList = [{
      email: "admin@mailinator.com",
      password: "$2a$12$C1ysEDbeAPLvic86kF6k6O3di0U947zF8aVEkpClP1MjyuHT.ZQFq",
      status: "active",
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    const roles = [1,2]
    const statuses = user.getAttributes().status.values

    for (let i = 0; i < 10; i++) {
      const userSeedData = {
        email: faker.internet.email(),
        password: "$2a$12$C1ysEDbeAPLvic86kF6k6O3di0U947zF8aVEkpClP1MjyuHT.ZQFq",
        role_id: roles[Math.floor(Math.random()*roles.length)],
        status: statuses[Math.floor(Math.random()*statuses.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      usersList.push(userSeedData);
      console.log('------user created-----------', i+1);
    }
    await queryInterface.bulkInsert('Users', usersList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
