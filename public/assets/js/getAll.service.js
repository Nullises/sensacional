(function() {
  'use strict';

  angular
    .module('SensacionalApp')
    .service('getAll', getAll);

    getAll.$inject = ['$http', '$q'];

    function getAll($http, $q){

      this.respuesta = function(){

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/getAll').then(successCallback, errorCallback);

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
