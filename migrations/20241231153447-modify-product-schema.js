'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove `image` column from Products table
    await queryInterface.removeColumn('Products', 'image');

    // Create ProductImages table
    await queryInterface.createTable('ProductImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add `image` column to Products table
    await queryInterface.addColumn('Products', 'image', {
      type: Sequelize.STRING,
    });

    // Drop ProductImages table
    await queryInterface.dropTable('ProductImages');
  },
};
