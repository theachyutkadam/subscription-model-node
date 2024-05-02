'use strict';

/** @type {import('sequelize-cli').Migration}*/
const {faker} = require('@faker-js/faker');
const { user, Company, plan, Sequelize } = require("./../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    // const companiesList = [];
    const comp_statuses = Company.getAttributes().status.values
    for (let i = 0; i < 10; i++) {
      const comapnySeedData = {
        name: faker.company.name(),
        email: faker.internet.email(),
        status: comp_statuses[Math.floor(Math.random()*comp_statuses.length)],
        contact: faker.number.int({ min: 1111111111, max: 9999999999 }),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      comapnySeedData.deletedAt = comapnySeedData.status == "deleted" ? new Date() : null
      console.log('----***********--company created------********-----', i+1);
      await queryInterface.bulkInsert('Companies', [comapnySeedData], {});
      const company = await Company.findAll({
        limit: 1, where: { email: comapnySeedData.email }, paranoid: false, order: [ [ 'createdAt', 'DESC' ]]
      })
      console.log('Check--com object->', company[0].id);
      const roles = [1,2]
      // const usersList = []
      const statuses = user.getAttributes().status.values
      for (let i = 0; i < 10; i++) {
        const userSeedData = {
          email: faker.internet.email(),
          password: "$2a$12$C1ysEDbeAPLvic86kF6k6O3di0U947zF8aVEkpClP1MjyuHT.ZQFq",
          role_id: roles[Math.floor(Math.random()*roles.length)],
          company_id: company[0].id,
          status: statuses[Math.floor(Math.random()*statuses.length)],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        userSeedData.deletedAt = userSeedData.status == "deleted" ? new Date() : null
        // usersList.push(userSeedData);
        console.log('------user created-----------', i+1);
        await queryInterface.bulkInsert('Users', [userSeedData], {});
        const user_object = await user.findAll({
          limit: 1, where: { email: userSeedData.email }, paranoid: false, order: [ [ 'createdAt', 'DESC' ]]
        })
        const plansList = [];
        const types = plan.getAttributes().type.values
        for (let i = 0; i < 10; i++) {
          const planSeedData = {
            name: faker.person.jobTitle(),
            price: faker.number.float({ min: 100, max: 5000, multipleOf: 0.02 }),
            is_active: faker.datatype.boolean(),
            type: types[Math.floor(Math.random()*types.length)],
            expire_at: faker.date.anytime(),
            user_id: user_object[0].id,
            description: "none",
            createdAt: new Date(),
            updatedAt: new Date()
          };
          plansList.push(planSeedData);
          console.log('------plan created-----------', i+1);
        }
        await queryInterface.bulkInsert('Plans', plansList, {});
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
