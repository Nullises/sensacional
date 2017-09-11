(function() {
  'use strict';

  angular
    .module('SensacionalApp')
    .service('getProductBetween', getProductBetween);

    getProductBetween.$inject = ['$http', '$q'];

    function getProductBetween($http, $q){

      this.respuesta = function(low, high){

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/getProductBetween/' + low + '/' + high)
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
