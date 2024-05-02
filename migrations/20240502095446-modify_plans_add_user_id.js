'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Plans', // table name
        'user_id', // new field name
        {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          // allowNull: false,
          // primaryKey: true,
          references: {
            model: 'users', //table name
            key: 'id',
            as: 'user_id',
          }
        },
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Plans', 'user_id'),
    ]);
  }
};
