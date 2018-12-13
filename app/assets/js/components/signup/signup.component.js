angular
	.module('app')
	.component('signup', {
		templateUrl: 'assets/js/components/signup/signup.component.html',
		controller: ['$scope', '$state', 'AuthorizationService', 'generalServices', function($scope, $state, AuthorizationService, generalServices) {
			this.user = AuthorizationService.currentUser();
			this.request = {
				username: this.user.user
			};
			this.countries = generalServices.getCountries();
			this.roles = ["Country representative", "Country template designer","Guest"];
			this.formSubmitted = false;
			this.countryPlaceholder = 'Please select country';
			this.rolePlaceholder = 'Please select role';

			this.signUp = () => {
				AuthorizationService.signUp(this.request);
                    this.formSubmitted = true;
			}

			this.setCountry = country => {
				this.request.country = country.country;
				this.countryPlaceholder = country.country;
			}

			this.setRole = role => {
				this.request.role = role.role;
				this.rolePlaceholder = role.role;
			}
		}]
	});