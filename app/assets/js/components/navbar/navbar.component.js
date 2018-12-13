angular
	.module('app')
	.component('navbar', {
		templateUrl: 'assets/js/components/navbar/navbar.component.html',
		bindings: {
			data: '<',
			status: '='
		},
		controller: [
			'AuthorizationService',
			'tenantService',
			'generalServices',

			function (
				AuthorizationService,
				tenantService,
				generalServices
			) {
				let userData,
					tenant = tenantService.getTenant();
				this.navbarStatus = {};

				this.$onInit = function () {
					userData = AuthorizationService.currentUser();
					this.userName = userData.user;
					this.tenants = userData.roles.tenants;
					this.tenant = tenant;
					this.languages = generalServices.getCountryLanguage(tenant);
					this.language = tenantService.getLanguage(tenant);
				};

				this.updateTenant = (tenant) => {
					tenantService.updateTenant(tenant);
				};

				this.updateLanguage = language => {
					tenantService.updateLanguage(language);
				};

			}]
	})