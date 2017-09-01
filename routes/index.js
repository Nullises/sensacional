var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

//Pagina inicial
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Obtener todos los productos
router.get('/getAll', function(req, res){
  models.product.findAll({}).then(function(getAll) {
    res.json(getAll);
  });
});

//Comprobar conexión a DB
models.sequelize.authenticate().then(function(err) {
    console.log('La conexión a Base de Datos se ha establecido correctamente');
}).catch(function (err) {
    console.log('Imposible conectarse a Base de Datos:', err);
});

module.exports = router;
