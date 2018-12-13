angular
	.module('app')
	.component('file', {
		templateUrl: 'assets/js/components/file/file.component.html',
		bindings: {
			file: '<',
			options: '<',
			success: '<',
			class: '<',
			status: '<'
		},
		controllerAs: 'fileController'
	});