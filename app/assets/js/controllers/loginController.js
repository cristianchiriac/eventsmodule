angular
	.module('app')
	.controller(
		'loginController', [
			'$scope',
			'$state',
			'$rootScope',
			'AuthorizationService',
			'AlertService',

			(
				$scope,
				$state,
				$rootScope,
				AuthorizationService,
				AlertService) => {

				// /* get current user and state */
				$scope.isLoggedIn = AuthorizationService.isLoggedIn();
				$scope.currentUser = AuthorizationService.currentUser();
				$scope.hasRoles = AuthorizationService.hasRoles();

				$scope.sessionExpired = AuthorizationService.sessionExpired();

				/* login and redirect to dashboard */
				$scope.login = ($event) => {
					let username = (AuthorizationService.currentUser()) ? AuthorizationService.currentUser().user : $scope.vm.username;
					let password = $scope.vm.password;

					AuthorizationService
						.login(
							username,
							password
						)
						.then(() => {
							if (AuthorizationService.hasRoles()) {
								$state.go('appSimple.dashboard');
							} else {
								$scope.hasRoles = false;
								$scope.isLoggedIn = true;
							}
						}, (reason) => {
							AlertService.add(
								'danger',
								reason.data.message,
								4000);
						})
						.finally(() => {
							angular
								.element($event.currentTarget)
								.toggleClass('showSpinner');
						});
				};

				/* reset user data and log out */
				$scope.logout = () => {
					AuthorizationService.logout();
					$scope.isLoggedIn = false;
					if ($state.is('appSimple.auth')) {
						$state.reload();
					} else {
						$state.go('appSimple.auth');
					}
				};
			}
		]);