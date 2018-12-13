angular
    .module('app')
    .directive('previewTemplate', function() {
        return {
            scope: {
                template: '='
            },
            replace: false,
            link: function(scope, element, attributes) {
                if (scope.template) {

                    element[0].innerHTML = scope.template.body;
                }
                scope.$watch('template', function(newValue, oldValue) {
                    if (newValue) {
                        if (typeof newValue.body === 'string' || typeof newValue.content === 'string') {
                            element[0].innerHTML = scope.template.body;
                        } else {
                            element[0].innerHTML = newValue.body[0].innerHTML;
                        }
                    }
                });
            }
        };
    });
