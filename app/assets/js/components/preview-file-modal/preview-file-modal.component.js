angular
	.module('app')
	.component('previewFileModal', {
		templateUrl: 'assets/js/components/preview-file-modal/preview-file-modal.component.html',
		bindings: {
			resolve: '<',
			close: '&',
			file: '<'
		},
		controllerAs: 'previewModal',
		controller: [
			'generalServices',

			function (
				generalServices
			) {
				this.$onInit = function () {
					this.title = this.resolve.title;
					this.file = this.resolve.file;
					this.url = generalServices.base64ToBlob(this.file);
				};
				this.close = function () {
					this.close();
				};
			}]
	});