'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('produtos','valor_compra',{
      type: Sequelize.FLOAT,
      allowNull: true
   });
   await queryInterface.addColumn('produtos','minimo_estoque',{
    type: Sequelize.FLOAT,
        allowNull: true
 });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('produtos','valor_compra',);
    await queryInterface.removeColumn('produtos','minimo_estoque',);
  }
};
