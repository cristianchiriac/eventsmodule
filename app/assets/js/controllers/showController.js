angular
	.module('app')
	.controller('showController', ['$scope', '$state', '$stateParams', 'DataService', 'AlertService', 'AuthorizationService', 'generalServices', '_', '$localStorage', '$uibModal',
		function ($scope, $state, $stateParams, DataService, AlertService, AuthorizationService, generalServices, _, $localStorage, $uibModal) {
			/*general variables*/
			var tenant = AuthorizationService.getTenant(),
				slug = $stateParams.slug,
				resendUrl = '/notifications-resend/notifications',
				accept = ($state.params.type === 'notifications') ? 'application/x.com.media-saturn.rea.email-template+json' : 'application/x.com.media-saturn.rea.pdf-template+json',
				templateUrl = ($state.params.type == 'notifications') ? '/notifications/templates' : '/documents/templates';

			$scope.templatesDataConfig = {
				autoHideScrollbar: false,
				theme: 'minimal-dark',
				advanced: {
					updateOnContentResize: true
				},
				scrollInertia: 300
			};

			/* get published template */
			DataService.getData(templateUrl + '/' + slug + '/published', 0, {
				'Accept': accept,
				'X-Tenant': tenant,
				'Accept-Language': 'de_AT'
			})
				.then(function (response) {
					DataService.getData(resendUrl + '/' + response.data.slug, 0, {
						'X-Tenant': tenant
					})
						.then(function (response) {
							$scope.showResendSubject = true;
							$scope.vm.resendSubject = response.data.subject;
						});
					$scope.template = response.data;
					$scope.left = [response.data.body].join('\n');
					$scope.template.body = response.data.body;
					$scope.templateName = response.data.name;
					$localStorage.templateVersion = response.headers().version;

				});

			/* get draft of a template */
			DataService.getData(templateUrl + '/' + slug + '/draft', 0, {
				'X-Tenant': tenant,
				'Accept-Language': 'de_AT'
			})
				.then(function (response) {
					$scope.draft = response.data;
					$scope.right = [response.data.body].join('\n');
					$scope.draft.body = response.data.body;
					$scope.templateName = response.data.name;
					$localStorage.draftVersion = response.headers().version;

				});

			$scope.openTemplate = function (template, state, isDraft) {
				generalServices.openTemplate(template, state, isDraft);
			};

			$scope.preview = function (isDraft) {
				var temp, template;

				$localStorage.draft = isDraft;
				template = $scope.previewTemplate = (isDraft) ? $scope.draft : $scope.template;
				temp = $scope.previewTemplate = _.clone(template);
				$scope.showPreview = true;

			};

			$scope.generatePreview = function () {
				var payload, contentType;
				$scope.previewTemplate = ($localStorage.draft) ? $scope.draft : $scope.template;
				payload = {
					type: "text/html",
					subject: $scope.previewTemplate.subject || '',
					body: $scope.previewTemplate.body,
					data: $scope.vm.requestVariables || ''
				};

				contentType = 'application/x.com.media-saturn.rea.email-template-preview-data+json';

				DataService.putData(
					'/notifications/templates/preview',
					payload,
					'POST', {
						'Content-Type': contentType,
						'Accept-Language': 'de_AT',
						'X-Tenant': tenant
					}
				).then(function (response) {
					$scope.showPreview = true;
					$scope.previewChanged = true;
					$scope.generatedTemplate = response.data;
				}, function (reason) {
					AlertService.add('danger', 'There was a problem generating the preview!');
				});
			};

			$scope.closePreview = function () {
				$scope.showPreview = false;
				$scope.previewTemplate = null;
				$scope.generatedTemplate = null;
			};

			$scope.publish = function () {
				templateUrl = ($state.params.type == 'notifications') ? templateUrl + '/email' : templateUrl;
				generalServices.publish(templateUrl + '/' + slug, slug, tenant)
					.then(function () {
						AlertService.add('success', 'Template was published!');
						$state.go(($state.params.type == 'notifications') ? 'app.templates-list' : 'app.pdf-list');
					}, function (reason) {
						AlertService.add('danger', 'There was a problem publishing the draft!');
					});
			};

			$scope.sendPreview = function () {
				var modalInstance = $uibModal.open({
					templateUrl: "views/components/email/email-modal.html",
					size: 'md',
					resolve: {
						previewTemplate: function () {
							return $scope.previewTemplate || $scope.template || $scope.draft;
						},
						requestVariables: function () {
							return $scope.vm.requestVariables;
						}
					},
					controller: ['$scope', 'previewTemplate', 'requestVariables', '$uibModalInstance', function ($scope, previewTemplate, requestVariables, $uibModalInstance) {
						var requestURL = '/notifications/notifications',
							headers = {
								"Content-Type": "application/x.com.media-saturn.rea.revision-template-email-delivery+json",
								"Accept-Language": "en_US",
								"X-Tenant": tenant
							};
						$scope.send = function () {
							DataService.putData(requestURL, {
									to: [$scope.to],
									from: 'rea-tst@media-saturn.com',
									template: previewTemplate.slug,
									revision: $localStorage.draft ? $localStorage.draftVersion : $localStorage.templateVersion,
									data: requestVariables || ''
								},
								'POST', headers)
								.then(function (response) {
									AlertService.add('success', 'Preview was successfully sent!');
									$uibModalInstance.close(false);
								}, function (reason) {
									AlertService.add('danger', 'There was a problem sending the preview!');
									$uibModalInstance.close(false);
								});
						};
						$scope.close = function (reason) {
							$uibModalInstance.close(false);
						};
					}]
				});
			};
		}
	]);
