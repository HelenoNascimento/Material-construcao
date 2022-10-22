'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   /* await queryInterface.addColumn('produtos','status',{
       type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Ativo'
    });
   */
  },
  

  async down (queryInterface, Sequelize) {
    /*
    await queryInterface.removeColumn('produtos','status',);
    */
  }
};
