'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define categories
    const categories = [
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Clothing', description: 'Men and Women Clothing' },
      { name: 'Books', description: 'All types of books' },
    ];

    // Insert categories
    await queryInterface.bulkInsert(
      'Categories',
      categories.map((category) => ({
        ...category,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Fetch inserted categories
    const insertedCategories = await queryInterface.sequelize.query(
      `SELECT * FROM Categories`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create 150 products dynamically
    const products = [];
    const productAttributes = [];
    const productImages = [];

    for (let i = 1; i <= 150; i++) {
      const categoryIndex = (i - 1) % insertedCategories.length;
      const category = insertedCategories[categoryIndex];

      // Add product to the products array
      products.push({
        name: `Product ${i}`,
        description: `This is the description for Product ${i}.`,
        price: (Math.random() * 100).toFixed(2), // Random price between 0 and 100
        stock: Math.floor(Math.random() * 200) + 1, // Random stock between 1 and 200
        categoryId: category.id, // Use the fetched category ID
        isDeleted: false,
        isFavourite: Math.random() > 0.7, // Randomly mark as favorite (30% chance)
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Add attributes for the product
      productAttributes.push(
        {
          key: 'color',
          value: ['Red', 'Blue', 'Green', 'Black', 'White'][Math.floor(Math.random() * 5)], // Random color
          productId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'size',
          value: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)], // Random size
          productId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: 'material',
          value: ['Cotton', 'Plastic', 'Metal', 'Leather'][Math.floor(Math.random() * 4)], // Random material
          productId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );

      // Assign placeholder image for all products
      productImages.push({
        productId: i,
        imageUrl: `uploads/product-placeholder.jpg`, // Default placeholder image URL
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert products
    await queryInterface.bulkInsert('Products', products);

    // Fetch inserted products
    const insertedProducts = await queryInterface.sequelize.query(
      `SELECT id FROM Products`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Map attributes to the correct product IDs
    const finalProductAttributes = productAttributes.map((attribute, index) => ({
      ...attribute,
      productId: insertedProducts[index % insertedProducts.length].id,
    }));

    // Insert product attributes
    await queryInterface.bulkInsert('ProductAttributes', finalProductAttributes);

    // Map images to the correct product IDs
    const finalProductImages = productImages.map((image, index) => ({
      ...image,
      productId: insertedProducts[index % insertedProducts.length].id,
    }));

    // Insert product images
    await queryInterface.bulkInsert('ProductImages', finalProductImages);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all images, attributes, products, and categories
    await queryInterface.bulkDelete('ProductImages', null, {});
    await queryInterface.bulkDelete('ProductAttributes', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
