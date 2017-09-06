var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

//Pagina inicial
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

//Obtener todos los productos
router.get('/getAll', function(req, res){
  models.product.findAll({}).then(function(getAll) {
    res.json(getAll);
  });
});

//Obtener todos los productos (OR)
router.get('/getProductOr/:condition/:brand/:name/:categories', function(req, res){
  models.product.findAll({
    where: {
      $or: [
        {
          condition: req.params.condition
        },
        {
          brand: req.params.brand
        },
        {
          name: req.params.name
        },
        {
          categories: req.params.categories
        }
      ]
    }
  }).then(function(getProductOr){
    res.json(getProductOr);
  });
});

//Obtener todos los productos (AND)
router.get('/getProductAnd/:condition/:brand/:name/:categories', function(req, res){
  models.product.findAll({
    where: {
      $and: [
        {
          condition: req.params.condition
        },
        {
          brand: req.params.brand
        },
        {
          name: req.params.name
        },
        {
          categories: req.params.categories
        }
      ]
    }
  }).then(function(getProductAnd){
    res.json(getProductAnd);
  })
});

//Obtener todos los productos (BETWEEN)
router.get('/getProductBetween/:low/:high', function(req, res){
  models.product.findAll({
    where: {
      price: {
        $between: [req.params.low, req.params.high]
      }
    }
  }).then(function(getProductBetween){
    res.json(getProductBetween)
  })
});

//Comprobar conexión a DB
models.sequelize.authenticate().then(function(err) {
    console.log('La conexión a Base de Datos se ha establecido correctamente');
}).catch(function (err) {
    console.log('Imposible conectarse a Base de Datos:', err);
});

module.exports = router;
