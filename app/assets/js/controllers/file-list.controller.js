angular
	.module('app')
	.controller('fileListController',
		[
			'$scope',
			'$state',
			'$uibModal',
			'$localStorage',
			'tenantService',
			'DataService',
			'generalServices',

			function (
				$scope,
				$state,
				$uibModal,
				$localStorage,
				tenantService,
				DataService,
				generalServices
			) {

				/* Global variables */
				let tenant = tenantService.getTenant(),
					language = tenantService.getLanguage(tenant),
					endpoint = ENDPOINTS.FILES;

				/**
				 * get a single file
				 * @param slug {String}
				 * @returns {Promise}
				 */
				let getFile = function (slug) {
					return DataService.getData(
						`${endpoint}/${slug}`,
						0, {
							'X-Tenant': tenant,
							'Accept-Language': language,
							'Accept': 'application/x.com.media-saturn.rea.uploaded-file+json'
						})
				};

				/**
				 *	Get preview of a file
				 * @param slug {String}
				 * @returns {Promise}
				 */
				let getPreview = function (slug) {
					return generalServices.getPDF(
						`${endpoint}/${slug}`,
						'arraybuffer', {
							'X-Tenant': tenant,
							'Accept-Language': language,
							'Accept': 'application/pdf'
						})
				}

				/**
				 * Get list of files, based on tenant
				 * @returns {Void}
				 */
				let getFiles = () => {
					DataService.getData(endpoint, 0, {
						'X-Tenant': tenant,
						'Accept-Language': language
					})
						.then(
							response => this.files = response.data
						);
				};

				getFiles();

				/**
				 * Open a modal and edit an existing file
				 * @param slug {String}
				 * @returns {Void}
				 */
				this.edit = (slug) => {
					getFile(slug)
						.then(response => {
							$localStorage.etag = response.headers().version;
							 $uibModal.open({
								animation: true,
								backdrop: 'static',
								component: 'uploadFileModal',
								size: 'lg',
								resolve: {
									file: () => response.data,
									title: () => `Edit file '${(response.data.fileName) ? response.data.fileName : response.data.slug}'`,
									update: () => getFiles
								}
							})
						})
				};

				/**
				 * Get byteArray and preview the file in a modal window
				 * If userAgent is IE, the file will be downloaded instead
				 * @param file {Object: {slug: string, fileName: string, displayedName: string}}
				 * @returns {Void}
				 */
				this.preview = function (slug) {
					getPreview(slug)
						.then(response => {
							if (window.navigator && window.navigator.msSaveOrOpenBlob) {
								window.navigator.msSaveOrOpenBlob(response.data);
							} else {
								let fileName = generalServices.getFileName(response.headers('Content-Disposition'));
								$uibModal.open({
									animation: true,
									backdrop: 'static',
									component: 'previewFileModal',
									size: 'lg',
									resolve: {
										file: () => response.data,
										title: () => `Preview file ${fileName}`
									}
								})
							}
						})
				};

				/**
				 * Add a new file
				 * @param file {Object: {slug: string, fileName: string, displayedName: string}}
				 * @returns {Void}
				 */
				this.addStaticFile = function (file) {
					let modalTitle = (file) ? 'Edit file' : 'Upload new file';
					let modalInstance = $uibModal.open({
						animation: true,
						backdrop: 'static',
						component: 'uploadFileModal',
						size: 'lg',
						resolve: {
							file: () => file,
							title: () => modalTitle,
							update: () => getFiles
						}
					});
				};

				/**
				 * Clear the filter input
				 * @returns {Void}
				 */
				this.clear = function () {
					this.term = '';
				};

				/* Reload list on distribution channel change */
				$scope.$on(
					'tenantChanged', () => $state.reload()
				);
				/* Reload list on language change */
				$scope.$on(
					'languageChanged', () => $state.reload()
				);
				/* Update list on file upload */
				$scope.$on('file-uploaded', () => getFiles()
				);

			}]);