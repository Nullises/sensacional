(function() {
    'use strict';

    angular
        .module('SensacionalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
          url: '/'
        });
    }
})();
