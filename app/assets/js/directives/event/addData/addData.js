angular
    .module('app')
    .directive("addData", [function() {
        return {
            scope: true,
            template: '<a class="btn btn-primary new" ng-click="addData()"><span class="glyphicon glyphicon-plus"></span> Add data</a>',
            link: function(scope, element, attributes) {
                var model = attributes.model,
                    prefix = attributes.prefix,
                    index = scope.event[model].length - 1;
                scope.index = index;
                scope.prefix = attributes.prefix;
                scope.addData = function() {
                    if (!scope.event[model][index].points) {
                        scope.event[model][index].points = [];
                    }
                    scope.event[model][index].points.push({
                        name: ''
                    });
                };
            }
        };
    }]);
