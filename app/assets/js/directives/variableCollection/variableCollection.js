angular
    .module('app')
    .directive('variableCollection', function() {
        return {
            scope: {
                model: '=model',
                object: '=object',
                index: '=index'
            },
            templateUrl: function(element, attributes) {
                return attributes.template || 'assets/js/directives/variableCollection/source.html';
            },
            link: function(scope, element, attributes) {

                if (!scope.model) {
                    scope.model = {};
                }
                scope.index = scope.$eval(attributes.index);

                var newModel = {};

                for (var i = 0; i < scope.object.elements.fields.length; i++) {
                    newModel[scope.object.elements.fields[i].name] = '';
                }

                scope.model[scope.object.name] = [];
                scope.model[scope.object.name].push(JSON.parse(JSON.stringify(newModel)));

                scope.addData = function() {
                    scope.model[scope.object.name].push(JSON.parse(JSON.stringify(newModel)));
                };
                scope.remove = function(index) {
                    scope.model[scope.object.name].splice(index, 1);
                };
            }
        };
    });
