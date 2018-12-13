angular
    .module('app')
    .directive("addNewSource", [function() {
        return {
            templateUrl: 'assets/js/directives/event/addNewSource/add-new-source.html',
            scope: true,
            link: function(scope, element, attributes) {

                scope.model = attributes.model;
                scope.rules = attributes.rules;
                scope.group = attributes.group;
                scope.index = attributes.index;
                scope.parentIndex = attributes.parentIndex;

                var index = attributes.index,
                    object = {};

                var pointsPlaceholder = [];

                var conditionPlaceholder = {
                    condition: 'AND',
                    rules: []
                };

                scope.addConditions = function(item) {
                    item.trigger = {
                        condition: 'AND',
                        rules: []
                    };
                    item.trigger.rules.push({
                        xpath: ''
                    });
                };

                scope.addRule = function(item, collection) {
                    if (attributes.model === 'definition') {
                        if (!scope.event[attributes.model][attributes.rules]) {
                            scope.event[attributes.model] = conditionPlaceholder;
                        }
                        scope.event[attributes.model][attributes.rules].push({
                            value: ''
                        });
                    }
                    if (attributes.model === 'actions') {
                        if (!scope.event[attributes.model][attributes.index][attributes.group]) {
                            scope.event[attributes.model][attributes.index][attributes.group] = conditionPlaceholder;
                        }
                        scope.event[attributes.model][attributes.index][attributes.group][attributes.rules].push({
                            value: ''
                        });
                    }

                    if (attributes.model === 'context' || attributes.model === 'metadata') {
                        if (!scope.event[attributes.model][attributes.index][attributes.group]) {
                            scope.event[attributes.model][attributes.index][attributes.group] = conditionPlaceholder;
                        }
                        scope.event[attributes.model][attributes.index][attributes.group].push({
                            value: 'STRING_VALUE'
                        });
                    }

                    if (attributes.model === 'key') {
                        scope.event[attributes.model].push({
                            source: 'JMS',
                            point: [{
                                value: 'STRING_VALUE',
                                query: ''
                            }]
                        });
                    }
                };

                scope.addGroup = function(item, collection) {
                    if (!item[collection]) {
                        item[collection] = [];
                    }
                    item[collection].push({
                        xpath: ''
                    });
                };

                scope.remove = function(item, index) {
                    item.splice(index, 1);
                };
            }
        };
    }]);
