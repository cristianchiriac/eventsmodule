angular
    .module('app')
    .factory('AlertService', ['$timeout', function($timeout) {
        var alertService = {},
            alerts = [];

        // returns a list of all alerts
        alertService.get = function() {
            return alerts;
        };

        // adds a new alert to the alerts array
        alertService.add = function(type, message, timeout) {
            var time = timeout ? timeout : 3000;
            alerts.push({
                type: type,
                message: message,
                close: function() {
                    return alertService.close(alerts.indexOf(this));
                }
            });
            // removes the alert after specified time
            $timeout(function() {
                alertService.close(alerts.indexOf(this));
            }, time);
        };

        // removes an alert from the alerts array (by index)
        alertService.close = function(index) {
            return alerts.splice(index, 1);
        };

        return alertService;
    }]);
