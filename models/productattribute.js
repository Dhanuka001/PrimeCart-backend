'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductAttribute extends Model {
    static associate(models) {
      ProductAttribute.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  ProductAttribute.init(
    {
      productId: DataTypes.INTEGER,
      key: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductAttribute',
    }
  );
  return ProductAttribute;
};
