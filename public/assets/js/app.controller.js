(function(){
  'use strict';

  angular
        .module('SensacionalApp')
        .controller('SensacionalController', SensacionalController);

    SensacionalController.$inject = ['$scope', '$timeout', 'getAll', 'getProductOr', 'getProductAnd'];

    function SensacionalController ($scope, $timeout, getAll, getProductOr, getProductAnd) {

        //Toda la data (asíncrona)
        getAll.respuesta().then(function(data){
          let allData = data.data;

          let mapBrand = allData.map(function(x){
            return x.brand;
          });

          let mapNames = allData.map(function(x){
            return x.name;
          })

          let mapCategories = allData.map(function(x){
            return x.categories;
          })

          //key, param a usar en el ng-model
          $scope.availableSearchParams = [
            { key: "name", name: "Nombre del producto", placeholder: "Nombre del producto", restrictToSuggestedValues: true, suggestedValues: mapNames},
            { key: "brand", name: "Marca", placeholder: "Marca", restrictToSuggestedValues: true, suggestedValues: mapBrand },
            { key: "condition", name: "Condición", placeholder: "Condición"},
            { key: "categories", name: "Categorias", placeholder: "Categorias", restrictToSuggestedValues: true, suggestedValues: mapCategories},
          ];

        });

        //Función que captura todo del advanced-searchbox
        $scope.$on('advanced-searchbox:modelUpdated', function (event, model) {
          //Objeto key/value con todos los parámetros de búsqueda
          //console.log(model);

          //$scope.products = [];


          if(model.condition != undefined && model.brand != undefined && model.name != undefined && model.categories != undefined){
            var str = model.categories
            var replaceSlash = str.replace(/\//g, "%2F")
            getProductAnd.respuesta(model.condition, model.brand, model.name, replaceSlash)
            .then(function(data){
              console.log(data.data);
            });
          }else{
            getProductOr.respuesta(model.condition, model.brand, model.name, replaceSlash)
            .then(function(data){
              console.log(data.data);
            });
          }

        });

    }
})();
