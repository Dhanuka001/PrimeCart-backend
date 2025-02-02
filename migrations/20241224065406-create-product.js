'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the `image` column from the Product table
    await queryInterface.removeColumn('Products', 'image');

    // Create the ProductImages table
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
    // Re-add the `image` column to the Product table
    await queryInterface.addColumn('Products', 'image', {
      type: Sequelize.STRING,
    });

    // Drop the ProductImages table
    await queryInterface.dropTable('ProductImages');
  },
};
