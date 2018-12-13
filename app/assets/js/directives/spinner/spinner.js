angular
    .module('app')
    .directive('spinner', ['$state', function($state) {
        return {
            templateUrl: 'assets/js/directives/spinner/spinner.html',
            replace: true
        };
    }]);
