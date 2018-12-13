angular
    .module('app')
    .directive('source', function() {
        return {
            replace: false,
            scope: false,
            templateUrl: function(element, attributes) {
                return attributes.template || 'assets/js/directives/event/source/source.html';
            },
            link: function(scope, element, attributes) {
                scope.object = scope.$eval(attributes.model);
                if (attributes.type === 'attachments') {
                    scope.object = scope.$eval(attributes.model).trigger;
                }
                scope.itemIndex = scope.$eval(attributes.sourceIndex);
                scope.category = attributes.category;
                scope.inAttachment = attributes.model == "event['actions'][parentIndex][model][index]" ? true: false;

                scope.addRule = function(list, simple) {
                    if (!list) list = [];
                    if (attributes.type === 'key') {

                        list.status = 0;
                        list.push({
                            source: 'JMS',
                            point: [{
                                value: 'STRING_VALUE',
                                query: ''
                            }]
                        });
                    } else if (attributes.type === 'actions') {
                        list.trigger = {
                            condition: 'AND',
                            rules: []
                        };
                        if (simple) {
                            list.push({
                                xpath: ''
                            });
                        } else {
                            list.trigger.rules.push({
                                xpath: ''
                            });
                        }
                    } else if (attributes.type === 'attachments' && simple) {
                        list.push({
                            xpath: ''
                        });

                    } else {
                        list.push({
                            [attributes.name]: ''
                        });
                    }
                };

                scope.addGroup = (item, collection) => {
                    if (!item[collection]) {
                        item[collection] = [];
                    }
                    item[collection].push(
                        (collection == 'rules') ? {
                            condition: 'AND',
                            rules: [{
                                xpath: ''
                            }]
                        } : {
                            query: ''
                        }
                    );
                };

                scope.removeCondition = (object, index) => {
                    object.rules.splice(index, 1);
                    if(index == 0){
                        delete  scope.$eval(attributes.model).trigger;
                    }
                }

            }
        };
    });