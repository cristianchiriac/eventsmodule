angular
	.module('app')
	.directive("sessionExpired", function() {
		return {
			scope: false,
			templateUrl: 'assets/js/directives/session-expired/session-expired.directive.html'
		};
	});