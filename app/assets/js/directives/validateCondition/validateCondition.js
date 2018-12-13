angular
    .module('app')
    .directive('validateCondition', [function() {
        return {
            scope: {
                item: '=validateCondition'
            },
            link: function(scope, element, attributes) {
                var operator;
                scope.$watch('item.operator', function(newValue, oldValue) {
                    if (newValue && newValue !== oldValue && (newValue === 'EXISTS' || newValue === 'NOT_EXISTS')) {
                        delete scope.item.value;
                    }
                });

            }
        };
    }]);
