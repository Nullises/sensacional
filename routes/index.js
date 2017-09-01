var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

//Pagina inicial
router.get('/', function(req, res, next) {
  res.json({ message: 'API Initialized!'});
});

//Comprobar conexión a DB
models.sequelize.authenticate().then(function(err) {
    console.log('La conexión a Base de Datos se ha establecido correctamente');
}).catch(function (err) {
    console.log('Imposible conectarse a Base de Datos:', err);
});


module.exports = router;
