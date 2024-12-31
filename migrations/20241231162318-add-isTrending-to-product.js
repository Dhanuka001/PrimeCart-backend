'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the `isTrending` column to the `Products` table
    await queryInterface.addColumn('Products', 'isTrending', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for existing rows
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the `isTrending` column from the `Products` table
    await queryInterface.removeColumn('Products', 'isTrending');
  },
};
