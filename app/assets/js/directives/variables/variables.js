angular
    .module('app')
    .directive('variables', function() {
        return {
            scope: false,
            templateUrl: 'assets/js/directives/variables/variables.html',
            replace: true,
            link: function(scope) {
                scope.isCollection = function(element) {
                    return (element === 'COLLECTION') ? true : false;
                };
            }
        };
    });
