angular
    .module('app')
    .directive("addSource", [function() {
        return {
            scope: true,
            template: '<a class="btn btn-primary new" ng-click="addSource()"><span class="glyphicon glyphicon-plus"></span> Add new {{model}}</a>',
            link: function(scope, element, attributes) {
                var i = 0,
                    model = attributes.model,
                    group = attributes.group;

                scope.model = model;

                scope.addSource = function() {
                    i++;
                    if (group === 'point') {
                        scope.event[model].push({
                            source: 'JMS',
                            point: [{
                                value: 'STRING_VALUE',
                                query: ''
                            }]
                        });
                    } else {
                        scope.event[model].push({
                            points: []
                        });
                    }
                };
            }
        };
    }]);
