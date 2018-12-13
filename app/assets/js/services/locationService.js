angular
    .module('app')
    .service('LocationService', ['$rootScope', '$state', 'localStorage',
        function($rootScope, $state, localStorage) {
            return {
                setReturnLocation: function(location) {
                    localStorage.returnLocation = location;
                },
                getReturnLocation: function() {
                    return (localStorage.returnLocation) ? localStorage.returnLocation : '/';
                }
            };
        }
    ]);
