angular
	.module('app')
	.directive('authorization', ['AuthorizationService', function(AuthorizationService) {
		return {
			priority: -100,
			restrict: 'A',
			scope: {
				permissions: '=',
				authorization: '='
			},
			// scope: false,
			link: function(scope, element, attributes) {
				var auth = {
					permissions: scope.permissions,
					authorization: scope.authorization
				};
				scope.vm = {};
				scope.vm.show = AuthorizationService.checkPermissionForView(auth);
				scope.vm.tooltip = true;
				if (!scope.vm.show) {
					element.on('click', function(event) {
						event.stopImmediatePropagation();
						event.preventDefault();
					});
					element[0].className += ' disabled';
				}
			}
		};
	}]);