angular
	.module('app')
	.component('uploadFileModal', {
		templateUrl: 'assets/js/components/upload-file-modal/upload-file-modal.component.html',
		controllerAs: 'uploadModal',
		bindings: {
			resolve: '<',
			close: '&',
			file: "<",
			title: '<',
			update: '<'
		},
		controller: ['$localStorage', function ($localStorage) {
			this.$onInit = function() {
				this.title = this.resolve.title;
				this.file = this.resolve.file;
				this.update = this.resolve.update;
			};
			this.closeModal = function () {
				delete $localStorage.etag;
				this.close();
			};
		}]
	});