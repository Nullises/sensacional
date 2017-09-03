(function(){
  'use strict';

  angular
        .module('SensacionalApp')
        .controller('SensacionalController', SensacionalController);

    SensacionalController.$inject = ['$scope', '$timeout', 'getAll', 'getProductOr'];

    function SensacionalController ($scope, $timeout, getAll, getProductOr) {

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

        $scope.selected = [];

        //Función que captura todo del advanced-searchbox
        $scope.$on('advanced-searchbox:modelUpdated', function (event, model) {
          //Objeto key/value con todos los parámetros de búsqueda
          //console.log(model);

          $scope.products = [];

          getProductOr.respuesta(model.condition, model.brand, model.name, model.categories)
          .then(function(data){
            console.log(data.data);
            $scope.products.push(data.data);
          });

        });

    }
})();
