const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("123456", 10); // Use the same hashed password for all users for simplicity

    return queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Seller User",
        email: "seller@example.com",
        password: hashedPassword,
        role: "seller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Customer User",
        email: "customer@example.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
