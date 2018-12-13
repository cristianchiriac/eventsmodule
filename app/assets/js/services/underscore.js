angular
    .module('app')
    .factory('_', ['$window', function($window) {
        return $window._;
    }]);