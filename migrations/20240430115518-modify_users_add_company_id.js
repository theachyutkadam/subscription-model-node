'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'company_id', // new field name
        {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          // allowNull: false,
          // primaryKey: true,
          references: {
            model: 'companies', //table name
            key: 'id',
            as: 'company_id',
          }
        },
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'company_id'),
    ]);
  }
};
