angular
    .module('app')
    .directive('sticky', ['$window', function($window) {
        var $win = angular.element($window);
        return {
            link: function(scope, element, attributes) {
                var topClass = attributes.sticky,
                    offsetTop = (attributes.offset) ? attributes.offset : element.offset().top;
                    
                if (element[0].clientWidth > 0) element[0].style.width = element[0].clientWidth + 'px';

                $win.on('scroll', function(e) {
                    if ($win.scrollTop() >= offsetTop) {
                        element.addClass(topClass);
                    } else {
                        element.removeClass(topClass);
                    }
                });
            }
        };
    }]);
