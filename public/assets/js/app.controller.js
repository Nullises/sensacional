(function(){
  'use strict';

  angular
        .module('SensacionalApp')
        .controller('SensacionalController', SensacionalController);

    SensacionalController.$inject = ['$scope', '$timeout', 'getAll', 'getProductOr', 'getProductAnd', 'getProductBetween' , '$document'];

    function SensacionalController ($scope, $timeout, getAll, getProductOr, getProductAnd, getProductBetween ,$document) {

        $scope.isChartAvailable = false;

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
              fillMainTable(data.data);
              purgeData(data.data);
            });
          }else{
            getProductOr.respuesta(model.condition, model.brand, model.name, replaceSlash)
            .then(function(data){
              fillMainTable(data.data);
              purgeData(data.data);
            });
          }
        });

        //Función que depura la data para el gráfico
        function purgeData(data){

          var vendidoQty = []; //verde
          var noVendidoQty = []; //rojo

          //Verificar si la data está vendida o no
          var mapQty = data.map(function(x){
            if(x.qty != 0 && x.price >= 1000){
              vendidoQty.push(x.qty)
            }else{
              noVendidoQty.push(x.qty);
            }
          });

          var vendidoPrice = [];
          var noVendidoPrice = [];


          var mapPrice = data.map(function(x){
            let p = Math.round(x.price/1000)*1000
            if(p != 0){
              vendidoPrice.push(p)
            }else{
              noVendidoPrice.push(p);
            }
          });

          var vendidoActualPrice = [];
          var noVendidoActualPrice = [];

          var mapActualPrice = data.map(function(x){
            if(x.price != 0){
              vendidoActualPrice.push(x.price)
            }else{
              noVendidoActualPrice.push(x.price);
            }
          });

          var categoriesActual = vendidoActualPrice.concat(noVendidoActualPrice);
          var uniqueCategoriesActual = [];
          $.each(categoriesActual, function(i, el){
              if($.inArray(el, uniqueCategoriesActual) === -1) uniqueCategoriesActual.push(el);
          });

          var categories = [1000000];

          fillChart(categories, uniqueCategoriesActual, vendidoQty, noVendidoQty);
        }

        //Función que renderiza el gráfico
        function fillChart(categories, uniqueCategoriesActual, vendidoQty, noVendidoQty){
          $scope.isChartAvailable = true;
          //Highcharts
          var chart = Highcharts.chart('container', {
            chart:{ type: 'column'},
            title: { text: 'Cantidad de Productos'},
            subtitle: { text: 'Vendidos y No Vendidos'},
            yAxis: { min: 0, title: { text: 'Cantidad'}},
            xAxis: {categories: categories, tickInterval: 1000},
            legend: {
                enabled: true //Leyenda de cada serie
            },
            credits: {
                enabled: false //Borra la marca de agua
            },
            lang: { //Traducción de las funciones de exportación al español
                printChart: 'Imprimir gráfico',
                downloadPNG: 'Descargar en PNG',
                downloadJPEG: 'Descargar en JPG',
                downloadPDF: 'Descargar en PDF',
                downloadSVG: 'Descargar en SVG',
                contextButtonTitle: 'EXPORTAR'
            },
                plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                $('#miModal').modal();
                                var current = this.category;
                                function findPrevious(el){
                                  if(el <= current){
                                    return el;
                                  }
                                }
                                var menores = uniqueCategoriesActual.filter(findPrevious);
                                var previous = menores[menores.length -1];
                                getProductBetween.respuesta(previous, current).then(function(data){
                                  fillModalTable(current, data.data);
                                });
                            }
                        }
                    }
                }
            },
            series: [
              {
                name: 'Vendidos',
                data: vendidoQty,
                color: '#4CAF50'
              },
              {
                name: 'No Vendidos',
                data: noVendidoQty,
                color: '#F44336  '
              }
            ]
          });
        }

        //Función que renderiza la Tabla Principal
        function fillMainTable(data){
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

        //Función que renderiza la tabla del Modal
        function fillModalTable(current, data){
          console.log(current);
          console.log(data);

          $document.ready(function(){
            //Tabla
            var table = $('#modal_table').DataTable({
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
                {"data": "status", render: function(data, type, row){if(data==true){return 'Sí'}else{return 'No'}}},
                {"data": "qty"}
              ],
            });
            //Búsqueda Individual (Filtro x Columna)
            $("#modal_table tfoot th").each( function ( i ) {
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
