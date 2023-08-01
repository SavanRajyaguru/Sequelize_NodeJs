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
    //* storage-Procedure
    await queryInterface.sequelize.query(`
      CREATE PROCEDURE find_name (IN name CHAR(50))
      BEGIN
        select * from actors where firstName = name;
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
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS find_name;');
  }
};
