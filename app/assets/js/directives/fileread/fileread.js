angular
    .module('app')
    .directive("fileread", function() {
        return {
            scope: true,
            link: function(scope, element, attributes) {
                element.on("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.vm.showTemplates = true;
                            scope.vm.xmlFile = loadEvent.target.result;
                        });
                    };
                    reader.readAsText(changeEvent.target.files[0]);
                });
            }
        };
    });
