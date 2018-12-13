angular
	.module('app')
	.directive('loginForm', function() {
		return {
			templateUrl: 'assets/js/directives/login-form/login-form.directive.html',
			scope: false
		}
	});