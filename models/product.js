'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Product.hasMany(models.ProductAttribute, { foreignKey: 'productId', as: 'attributes' });
      Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'images' });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      stock: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isFavourite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isTrending: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
