angular
    .module('app')
    .factory('cleanCSS', ['$window', function($window) {
        return $window.CleanCSS;
    }]);