'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //* storage-Procedure for count same name record
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE count_same_record (in name char(50), out count int)
      BEGIN
        select count(*) into count from actors where firstName = name;
      END
    `)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS count_same_record;');
  }
};
