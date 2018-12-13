angular
	.module('app')
	.component('dropdown', {
		templateUrl: 'assets/js/components/dropdown/dropdown.component.html',
		bindings: {
			icon: '<',
			identifier: '<',
			placeholder: '<',
			items: '<',
			setItem: '&'
		},
		controller: [
			'$scope',

			function () {

			this.setValue = value => {
				this.selected = value;
			}

			}]
	});