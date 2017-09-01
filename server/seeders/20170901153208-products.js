'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('products', [
      {
      id: 1,
      sku: '1349033',
      img: '/i/m/image_43170.jpg',
      name: 'Chaleco White Stag XL Café Rayado',
      brand: 'White Stag',
      price_ref: 10990.00,
      price: 3990.00,
      qty: 1,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Ropa Mujer/Chalecos y Polerones/Chalecos',
      url: 'chaleco-white-stag-xl-caf-rayado-1349033',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43170.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 2,
      sku: '1349018',
      img: '/i/m/image_43167.jpg',
      name: 'Sweater Jax L Gris',
      brand: 'Jax',
      price_ref: 25990.00,
      price: 7990.00,
      qty: 1,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Ropa Mujer/Chalecos y Polerones/Chalecos',
      url: 'sweater-jax-l-gris-1349018',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43167.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('products', [
      {
        id: 1
      },
      {
        id: 2
      }
    ])
  }
};
