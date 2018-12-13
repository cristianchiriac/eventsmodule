angular
    .module('app')
    .directive('alert', function() {
        return {
            templateUrl: 'assets/js/directives/alert/alert.html',
            replace: true,
        };
    });
