angular
    .module('app')
    .directive('fullHeight', ['$window', function($window) {
        var $win = angular.element($window);
        return {
            link: function(scope, element, attributes) {
                setHeight();

                function setHeight() {
                    var windowWidth = $win.outerWidth(),
                        windowHeight = $win.outerHeight(),
                        headerHeight, footerHeight, extraSpacings;
                        
                    if (windowWidth >= 990) {
                        if (attributes.fullHeight) {
                            windowHeight = windowHeight - attributes.fullHeight;
                        }
                        headerHeight = 55;
                        footerHeight = 51;
                        extraSpacings = 160;
                        element[0].style.maxHeight = windowHeight - (headerHeight + footerHeight + extraSpacings) + 'px';
                        element.mCustomScrollbar("update");
                    } else {
                        element.mCustomScrollbar("disable");
                        element[0].style.maxHeight = 'initial';
                        element[0].childNodes[0].style.maxHeight = 'initial';
                    }
                }

                $win.resize(function() {
                    setHeight();
                });

            }
        };
    }]);
