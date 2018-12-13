angular
    .module('app')
    .directive('sortable', ['generalServices', function(generalServices) {
        return {
            scope: {
                sortableList: "=",
                dropzone: "="
            },
            templateUrl: 'assets/js/directives/sortable/sortable.html',
            link: function(scope, element, attributes) {
                // check if dropzone exists, if not, create a blank one
                if (!scope.dropzone) scope.dropzone = [];
                scope.sortableItems = [];
                // check if sort fields are already assigned in order to have a unique list of available sort fields
                for (var i = 0; i < scope.sortableList.length; i++) {
                    if (!generalServices.containsObject(scope.sortableList[i], scope.dropzone, 'name', 'field')) {
                        scope.sortableItems.push({
                            field: scope.sortableList[i].name,
                            order: 'ASCENDING'
                        });
                    }
                }
            }
        };
    }]);
