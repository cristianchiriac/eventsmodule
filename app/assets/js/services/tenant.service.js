angular
	.module('app')
	.factory('tenantService',
		[
			'$rootScope',
			'$localStorage',
			'generalServices',
			'AuthorizationService',
			'sessionStorageService',
			'generalServices',

			function (
				$rootScope,
				$localStorage,
				generalServices,
				AuthorizationService,
				sessionStorageService
			) {

				let tenantService = {};

				tenantService.getTenant = () => {
					if (sessionStorageService.getItem('tenant'))
						return sessionStorageService.getItem('tenant');

					if ($localStorage.tenant)
						return $localStorage.tenant

					return AuthorizationService.currentUser().roles.tenants[0];
				};

				tenantService.getLanguage = (tenant) => {
					if (sessionStorageService.getItem('language')) {
						return sessionStorageService.getItem('language');
					}

					if ($localStorage.language) {
						return $localStorage.language;
					}
					return generalServices.getCountryLanguage(tenant)[0].isoCode;
				};

				tenantService.updateTenant = function(tenant) {
					let language = generalServices.getCountryLanguage(tenant)[0].isoCode;
					sessionStorageService.setItem('tenant', tenant);
					$localStorage.tenant = tenant;
					this.updateLanguage(language);
				    $rootScope.$broadcast("tenantChanged", tenant);
				};

				tenantService.updateLanguage = function(language) {
					sessionStorageService.setItem('language', language);
					$localStorage.language = language;
				    $rootScope.$broadcast("languageChanged");
				};

				return tenantService;
			}]);