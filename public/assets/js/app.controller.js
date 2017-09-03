(function(){
  'use strict';

  angular
        .module('SensacionalApp')
        .controller('SensacionalController', SensacionalController);

    SensacionalController.$inject = ['$scope', '$timeout', 'getAll', 'getProductOr', 'getProductAnd', '$document'];

    function SensacionalController ($scope, $timeout, getAll, getProductOr, getProductAnd, $document) {

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

        //Función que captura todo del advanced-searchbox (y lo recarga)
        $scope.$on('advanced-searchbox:modelUpdated', function (event, model) {

          if(model.condition != undefined && model.brand != undefined && model.name != undefined && model.categories != undefined){
            var str = model.categories
            var replaceSlash = str.replace(/\//g, "%2F")
            getProductAnd.respuesta(model.condition, model.brand, model.name, replaceSlash)
            .then(function(data){
              fillTable(data.data);
              fillChart(data.data);
            });
          }else{
            getProductOr.respuesta(model.condition, model.brand, model.name, replaceSlash)
            .then(function(data){
              fillTable(data.data);
              fillChart(data.data);
            });
          }

        });

        //Función que renderiza el gráfico
        function fillChart(data){
          console.log(data);
        }


        //Función que renderiza la Tabla
        function fillTable(data){
          $document.ready(function(){
            $('#sensacional_table').DataTable({
              data: data,
              dom: 'Bfrtip',
              destroy: true,
              searching: false,
              "order": [[ 5, "desc" ]], //Ordenado por Precio de Venta (descendente)
              "language": {
                  "url": "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
              },
              buttons: [ 'excel'],
              "columns":[
                {"data": "url_miniature", render: function(url, type, full){return '<img src="http://www.sensacional.cl/media/catalog/product/cache/1/thumbnail/65x/040ec09b1e35df139433887a97daa66f'+full.img+'"/>';}},
                {"data": "sku"},
                {"data": "name"},
                {"data": "condition"},
                {"data": "price_ref", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
                {"data": "price", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
                {"data": "status", render: function(data, type, row){if(data==true){return 'Sí'}else{return 'No'}}}
              ]
            });
          });
        }

    }
})();
