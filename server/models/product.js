'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    sku: DataTypes.STRING,
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price_ref: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    stock_availability: DataTypes.BOOLEAN,
    categories: DataTypes.STRING,
    url: DataTypes.STRING,
    condition: DataTypes.STRING,
    url_miniature: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};
