angular
	.module('app')
	.component('dashboard', {
		templateUrl: 'assets/js/components/dashboard/dashboard.component.html',
		controller: ['$state', 'AuthorizationService', 'tenantService', function($state, AuthorizationService, tenantService) {
			this.user = AuthorizationService.currentUser();
			this.logout = () => {
				AuthorizationService.logout();
				$state.go('appSimple.auth');
			}
		}]
	});