(function(){
  'use strict';

  angular
        .module('SensacionalApp')
        .controller('SensacionalController', SensacionalController);

    SensacionalController.$inject = ['$scope'];

    function SensacionalController ($scope) {

        //key, param a usar en el ng-model
        $scope.availableSearchParams = [
          { key: "name", name: "Nombre del producto", placeholder: "Nombre del producto" },
          { key: "brand", name: "Marca", placeholder: "Marca" },
          { key: "condition", name: "Condición", placeholder: "Condición"},
          { key: "categories", name: "Categorias", placeholder: "Categorias"},
        ];

        //Función que captura todo del advanced-searchbox
        $scope.$on('advanced-searchbox:modelUpdated', function (event, model) {
          //Objeto key/value con todos los parámetros de búsqueda
          console.log(model);
        });
    }
})();
