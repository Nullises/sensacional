(function() {
  'use strict';

  angular
    .module('SensacionalApp')
    .service('getProductAnd', getProductAnd);

    getProductAnd.$inject = ['$http', '$q'];

    function getProductAnd($http, $q){

      this.respuesta = function(condition, brand, name, categories){

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/getProductAnd/' + condition + '/' + brand + '/' + name + '/' + categories)
        .then(successCallback, errorCallback);

        function successCallback(response){
          defered.resolve(response);
        }

        function errorCallback(error){
          defered.reject(err)
        }

        return promise;

      }

    }

})();
