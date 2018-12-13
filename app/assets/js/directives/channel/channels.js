angular
    .module('app')
    .directive("channels", function() {
        return {
            scope: {
                changedEvents: '=',
                channel: '=',
                event: '='
            },
            templateUrl: 'assets/js/directives/channel/channel.html',
            replace: true,
            link: function(scope, element, attributes) {
                scope.updateEvent = function() {
                    element.parent().parent().parent().addClass('active');
                    element.parents().find('.events').addClass('active');
                    if (scope.changedEvents.indexOf(scope.event) === -1) {
                        scope.changedEvents.push(scope.event);
                    } else {
                        scope.changedEvents[scope.changedEvents.indexOf(scope.event)] = scope.event;
                    }
                };
            }
        };
    });
