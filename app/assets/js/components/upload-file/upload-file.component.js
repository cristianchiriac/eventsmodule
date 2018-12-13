angular
	.module('app')
	.component('uploadFile', {
		templateUrl: 'assets/js/components/upload-file/upload-file.component.html',
		bindings: {
			onClose: '&',
			file: '<'
		},
		controllerAs: 'upload',
		controller: [
			'tenantService',
			'Upload',
			'$localStorage',
			'generalServices',
			'$rootScope',
			'extensionFilter',
			'sizeFilter',

			function (
				tenantService,
				Upload,
				$localStorage,
				generalServices,
				$rootScope,
				extensionFilter,
				sizeFilter
			) {
				let endpoint = `/api${ENDPOINTS.FILES}`,
					tenant = tenantService.getTenant(),
					language = tenantService.getLanguage(tenant);

				this.$onInit = function () {
					if (this.file && this.file.displayedName) {
						this.displayedName = extensionFilter(this.file.displayedName, false, '.pdf');
						this.formats = "pdf";
						this.status = {};
					}
				};
				this.dropped = function (file) {
					this.newFile = file;
					this.status = {};
					if (file.size > 10239999) {
						this.status = {
							type: 'error',
							message: `File size exceeds 10240000 bytes (${sizeFilter(file.size)})`
						}
					}
				};
				this.remove = function () {
					this.newFile = null;
					this.status = {};
				};
				this.dismiss = function () {
					this.onClose();
				};
				this.save = function () {
					let data = {
						displayedName: extensionFilter(this.displayedName, true, 'pdf')
					};
					if (this.newFile && this.newFile.lastModified) data.file = this.newFile;
					this.status.progress = 0;
					this.error = null;
					this.status.upload = Upload.upload({
						url: (this.file && this.file.slug) ? `${endpoint}/${this.file.slug}` : endpoint,
						method: 'POST',
						headers: {
							'Accept-Language': language,
							'X-Tenant': tenant,
							'If-Match': $localStorage.etag
						},
						data: data
					});
					this.status.upload.then(response => {
						this.status.type = 'success';
						$localStorage.etag = response.headers().version;
						$rootScope.$broadcast('file-uploaded');
					}, reason => {
						this.status.type = 'error';
						if (reason.status === 409) {
							this.status.message = 'File already exists!';
						} else if (reason.status === 413) {
							this.status.message = "Request entity too large!"
						} else {
							this.status.message = 'There was a problem uploading the file!'
						}
					}, evt => {
						// Math.min is to fix IE which reports 200% sometimes
						this.status.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
					});
				}
			}]
	});