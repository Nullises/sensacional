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
      },
      {
      id: 3,
      sku: '1349005',
      img: '/i/m/image_43164.jpg',
      name: 'Polera Harolds M Roja',
      brand: 'Harolds',
      price_ref: 19990.00,
      price: 5990.00,
      qty: 5,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Ropa Mujer/Blusas y Poleras/Manga Larga',
      url: 'polera-harolds-m-roja-1349005',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43164.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 4,
      sku: '1388007',
      img: '/i/m/image_43160.jpg',
      name: 'Portabebé Disney Baby',
      brand: 'Disney',
      price_ref: 16990.00,
      price: 10990.00,
      qty: 5,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Infantil/Paseo y Viajes/Portabebés',
      url: 'portabeb-disney-baby-1388007',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43160.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 5,
      sku: '1388006',
      img: '/i/m/image_43156.jpg',
      name: 'Silla Portátil Para Comer Royal Care',
      brand: 'Royal Care',
      price_ref: 29990.00,
      price: 14990.00,
      qty: 10,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Infantil/Cuidado y Alimentación/Sillas de comer',
      url: 'silla-porttil-para-comer-royal-care-1388006',
      condition: 'Casi Sensacional',
      url_miniature: '/i/m/image_43156.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 6,
      sku: '1388004',
      img: '/i/m/image_43153.jpg',
      name: 'Silla De Actividades Baby Farlin Blanco/Celeste',
      brand: 'Baby Farlin',
      price_ref: 34990.00,
      price: 16990.00,
      qty: 3,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Infantil/Cuidado y Alimentación/Sillas de comer',
      url: 'silla-de-actividades-baby-farlin-blancoceleste-1388004',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43153.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 7,
      sku: '1388010',
      img: '/i/m/image_43148.jpg',
      name: 'Monitor Baby Talk Infanti',
      brand: 'Infanti',
      price_ref: 36990.00,
      price: 21990.00,
      qty: 4,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Infantil/Cuidado y Alimentación/Monitores',
      url: 'monitor-baby-talk-infanti-1388010',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43148.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 8,
      sku: '1388002',
      img: '/i/m/image_43145.jpg',
      name: 'Bicicleta Aro 16 Hot Wheels 68 Azul',
      brand: 'Hot Wheels',
      price_ref: 44990.00,
      price: 25990.00,
      qty: 0,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Deportes/Bicicletas/Bicicletas Infantiles',
      url: 'bicicleta-aro-16-hot-wheels-68-azul-1388002',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43145.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 9,
      sku: '1388003',
      img: '/i/m/image_43142.jpg',
      name: 'Centro De Actividades Excer Saucer Verde/Azul Granja',
      brand: 'Excer Saucer',
      price_ref: 69990.00,
      price: 34990.00,
      qty: 0,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Infantil/Juguetes/Centros de actividades',
      url: 'centro-de-actividades-excer-saucer-verdeazul-granja-1388003',
      condition: 'Casi Sensacional',
      url_miniature: '/i/m/image_43142.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      id: 10,
      sku: '1445001',
      img: '/i/m/image_43133.jpg',
      name: 'Sandalia Americanino 39 Beige',
      brand: 'Americanino',
      price_ref: 49990.00,
      price: 10990.00,
      qty: 1,
      status: true,
      stock_availability: true,
      categories: 'Root Catalog/Default Category/Ropa Mujer/Calzado',
      url: 'sandalia-americanino-39-beige-1445001',
      condition: 'Sensacional',
      url_miniature: '/i/m/image_43133.jpg',
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
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
      {
        id: 6
      },
      {
        id: 7
      },
      {
        id: 8
      },
      {
        id: 9
      },
      {
        id: 10
      }
    ])
  }
};
