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

          //Mapear Data
          let mapBrand = allData.map(function(x){
            return x.brand;
          });

          let mapNames = allData.map(function(x){
            return x.name;
          })

          let mapCategories = allData.map(function(x){
            return x.categories;
          })

          let mapCondition = allData.map(function(x){
            return x.condition;
          })

          //Filtrar (Evitar duplicados solo para dropdown de valores sugeridos)
          let uniqueBrands = [];
          $.each(mapBrand, function(i, el){
            if($.inArray(el, uniqueBrands) === -1) uniqueBrands.push(el);
          });

          let uniqueNames = [];
          $.each(mapNames, function(i, el){
            if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
          });

          let uniqueCategories = [];
          $.each(mapCategories, function(i, el){
            if($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
          });

          let uniqueCondition = [];
          $.each(mapCondition, function(i, el){
            if($.inArray(el, uniqueCondition) === -1) uniqueCondition.push(el);
          });

          //Parámetros de Búsqueda
          $scope.availableSearchParams = [
            { key: "name", name: "Nombre del producto", placeholder: "Nombre del producto", restrictToSuggestedValues: true, suggestedValues: uniqueNames},
            { key: "brand", name: "Marca", placeholder: "Marca", restrictToSuggestedValues: true, suggestedValues: uniqueBrands },
            { key: "condition", name: "Condición", placeholder: "Condición", restrictToSuggestedValues: true, suggestedValues: uniqueCondition},
            { key: "categories", name: "Categorias", placeholder: "Categorias", restrictToSuggestedValues: true, suggestedValues: uniqueCategories},
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
              purgeData(data.data);
            });
          }else{
            getProductOr.respuesta(model.condition, model.brand, model.name, replaceSlash)
            .then(function(data){
              fillTable(data.data);
              purgeData(data.data);
            });
          }
        });

        //Función que depura la data para el gráfico
        function purgeData(data){

          var vendido = []; //verde
          var noVendido = []; //rojo

          //Verificar si la data está vendida o no
          var mapQty = data.map(function(x){
            if(x.qty != 0){
              vendido.push(x)
            }else{
              noVendido.push(x);
            }
          });

          //Redondear precio de vendidos
          var roundPriceVendido = vendido.map(function(x){
            let price = Math.round(x.price/1000)*1000
            return price;
          });

          //Redondear precio de no vendidos
          var roundPriceNoVendido = noVendido.map(function(x){
            let price = Math.round(x.price/1000)*1000
            return price;
          });

          console.log('vendido', vendido);
          console.log('noVendido', noVendido);
          console.log(roundPriceVendido);
          console.log(roundPriceNoVendido);
        }





        //Función que renderiza la Tabla
        function fillTable(data){
          $document.ready(function(){
            //Tabla
            var table = $('#sensacional_table').DataTable({
              data: data,
              dom: 'Bfrtip',
              destroy: true,
              "order": [[ 5, "desc" ]], //Ordenado por Precio de Venta (descendente)
              "language": {
                  "url": "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
              },
              buttons: [ 'excel', 'pdf'],
              "columns":[
                {"data": "url_miniature", render: function(url, type, full){return '<img src="http://www.sensacional.cl/media/catalog/product/cache/1/thumbnail/65x/040ec09b1e35df139433887a97daa66f'+full.img+'"/>';}},
                {"data": "sku"},
                {"data": "name"},
                {"data": "condition"},
                {"data": "price_ref", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
                {"data": "price", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
                {"data": "status", render: function(data, type, row){if(data==true){return 'Sí'}else{return 'No'}}}
              ],
            });
            //Búsqueda Individual (Filtro x Columna)
            $("#sensacional_table tfoot th").each( function ( i ) {
                var select = $('<select><option value=""></option></select>')
                .appendTo( $(this).empty() )
                .on( 'change', function () {
                    table.column( i )
                        .search( $(this).val() )
                        .draw();
                } );
                table.column( i ).data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                });
            });

          });
        }

    }
})();
