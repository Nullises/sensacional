(function() {
    'use strict';
    angular
        .module('SensacionalApp')
        .directive('highchart', highchart);

    function highchart () {

        return {
            restrict: 'E',
            template: '<div></div>',
            replace: true,

            link: function (scope, element, attrs) {

                scope.$watch(function () { return attrs.chart; }, function () {

                    if (!attrs.chart) return;

                    var charts = JSON.parse(attrs.chart);

                    $(element[0]).highcharts(charts);

                });
            }
        };

    }
})();
