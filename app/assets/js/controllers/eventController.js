angular
	.module('app')
	.controller(
		'eventController', [
			'$scope',
			'$rootScope',
			'$state',
			'$stateParams',
			'DataService',
			'AlertService',
			'generalServices',
			'$element',
			'$uibModal',
			'$transitions',
			'$timeout',
			'tenantService',

			function (
				$scope,
				$rootScope,
				$state,
				$stateParams,
				DataService,
				AlertService,
				generalServices,
				$element,
				$uibModal,
				$transitions,
				$timeout,
				tenantService
			) {

				var tenant = tenantService.getTenant(),
					originalEvents, originalEvent,
					slug = $stateParams.slug,
					confirmationMessage = 'Your changes have not been saved. Are you sure you want to leave?',
					emailAcceptHeader = 'application/x.com.media-saturn.rea.published-email-template-list+json',
					pdfAcceptHeader = 'application/x.com.media-saturn.rea.published-pdf-template-list+json',
					smsAcceptHeader = 'application/x.com.media-saturn.rea.published-sms-template-list+json',
					language = tenantService.getLanguage(tenant);
				$scope.history = 0;
				$scope.templates = [];

				let getFiles = () => {
					DataService.getData('/documents/uploaded-files', 0, {
						'X-Tenant': tenant,
						'Accept': 'application/x.com.media-saturn.rea.uploaded-file-with-versions-list+json',
						'Accept-Language': language
					})
						.then(function (response) {
							$scope.files = response.data;
						});
				};

				var getAvailableVariables = function () {
					generalServices.getEventVariables(tenant, $scope.event.actions)
						.then((response) => {
							let variables = [],
								assignedVariables = [{
									name: "subject",
									type: "FIELD"
								}];
							//put all variables in one list
							response.forEach((listOfVariables) => {
								for (let property in listOfVariables) {
									variables = variables.concat(listOfVariables[property]);
								}
							});
							// Remove duplicate variables from list
							variables = _.uniq(variables, (variable) => variable.name);
							if ($scope.event.context && $scope.event.context.length > 0) {
								// merge variables from all existing contexts in one single array
								// so that we can generate a unique list of unassigned variables
								for (let j = 0; j < $scope.event.context.length; j++) {
									assignedVariables = _.union(assignedVariables, $scope.event.context[j].points);
								}
								let variablesList = [];
								variablesList = generalServices.removeDuplicates(
									assignedVariables,
									_.uniq(variables, (variable) => variable.name));
								$scope.vm.availableVariables = variablesList;
							} else {
								$scope.vm.availableVariables = generalServices.removeDuplicates(
									assignedVariables,
									_.uniq(variables, (variable) => variable.name));
							}
						});
				};

				$scope.upload = function (file, $event) {
					var parser, xmlDoc;
					$scope.showEvent = true;
					parser = new DOMParser();
					xmlDoc = parser.parseFromString(file, "text/xml");
					$scope.vm.xmlDoc = file;
				};

				$scope.remove = function (list, index) {
					if (list.fields) {
						list.fields.splice(index, 1);
					} else {
						list.splice(index, 1);
					}
					getAvailableVariables();
				};

				$scope.addVariable = function (item, index) {
					function newItem(item) {
						var object = {},
							value;

						if (item.operator) {
							value = item.operator;
						} else {
							value = (item.type === 'FIELD') ? 'STRING_VALUE' : 'OBJECT_LIST';
						}

						if (item.type === 'COLLECTION') {
							object = {
								query: item.query,
								value: value,
								name: item.name,
								fields: []
							};
							for (var i = 0; i < item.elements.fields.length; i++) {
								object.fields.push(new newItem(item.elements.fields[i]));
							}
						} else {
							object = {
								query: item.query,
								value: value,
								name: item.name
							};
						}
						getAvailableVariables();
						return object;
					}

					$scope.event.context[item.source].points.push(new newItem(item));
					$scope.vm.availableVariables.splice(index, 1);
				};

				$scope.vm.changedEvents = [];
				$scope.vm.availableVariables = [];

				if ($state.is('app.events')) {
					DataService.getData(ENDPOINTS.JMS, 0, {
						'X-Tenant': tenant
					})
						.then(function (response) {
							$scope.events = response.data;
							originalEvents = JSON.stringify(response.data);
						});
					$scope.$on('tenantChanged', function () {
						$state.reload();
					});
					$scope.updateChanges = function () {
						DataService.putData(ENDPOINTS.JMS, $scope.vm.changedEvents,
							'POST', {
								'Content-Type': 'application/x.com.media-saturn.rea.events-channel-changes+json',
								'X-Tenant': tenant
							})
							.then(function () {
								AlertService.add('success', 'Events successfully updated!');
								$element.find('.active').removeClass('active');
								$scope.vm.changedEvents = [];
							}, function (reason) {
								AlertService.add('danger', 'There was a problem updating the events! :(');
							});
					};
					$scope.discardChanges = function () {
						$element.removeClass('active');
						$element.find('.active').removeClass('active');
						$scope.vm.changedEvents = [];
						$scope.events = JSON.parse(originalEvents);
					};
				}

				if ($state.is('app.newEvent')) {
					var initializing = true;
					// add a blank event
					$scope.event = {
						context: [],
						definition: {
							condition: 'AND',
							rules: [{}]
						},
						actions: [{
							template: {
								slug: null,
								version: null
							},
							trigger: {
								condition: "AND",
								rules: [{}]
							},
							locale: [{
								source: 'JMS',
								point: {
									query: '',
									value: 'STRING_VALUE'
								}
							}, {
								source: 'JMS',
								point: {
									query: '',
									value: 'STRING_VALUE'
								}
							}],
							attachments: []
						}],
						metadata: [],
						key: [{
							source: "JMS",
							point: [{
								value: "STRING_VALUE"
							}]
						}]
					};
					originalEvent = JSON.parse(JSON.stringify($scope.event));
					$scope.vm.available = [];
				}

				$scope.$watch('event', function (newValue, oldValue) {
					if (initializing) {
						$timeout(() => {
							initializing = false;
							$scope.history = 0;
						});
					} else {
						if (originalEvent && newValue && !angular.equals(newValue, originalEvent)) {
							$scope.history++;
						} else {
							$scope.history = 0;
						}
					}
				}, true);

				$transitions.onStart({}, function (transition) {
					// if changes have been made to the dom)
					if ((transition.from().name === 'app.newEvent' || transition.from().name === 'app.event')) {
						if ($scope.history > 0) {
							// on cancel, remain in the current state
							if (!confirm(confirmationMessage)) {
								return false;
							} else {
								// on confirmation, close the editor and go to selected state
								$scope.history = 0;
								originalEvent = null;
							}
						}
					} else { // if no changes have been made
						originalEvent = null;
						$scope.history = 0;
					}
				});

				if ($state.is('app.event') || $state.is('app.newEvent')) {
					let initializing = true;

					DataService.getData('/notifications/templates', 0, {
						'X-Tenant': tenant,
						'Accept': emailAcceptHeader
					})
						.then(function (response) {
							let emailTemplates = response.data;
							$scope.templates.push.apply($scope.templates, emailTemplates);
						});

					DataService.getData('/documents/templates', 0, {
						'X-Tenant': tenant,
						'Accept': pdfAcceptHeader,
						'Accept-Language': language
					})
						.then(function (response) {
							$scope.documents = response.data;
							DataService.getData(`${ENDPOINTS.JMS}/${slug}`, 0, {
								'X-Tenant': tenant
							})
								.then(function (response) {
									$scope.event = DataService.transformEvent(response.data, '', false);
									$scope.isDirty = response.data.isDirty;
									originalEvent = angular.copy($scope.event);
									$scope.$emit('templateChanged');
								});
						})
						.then(() => {
							getFiles();
						});

					DataService.getData('/notifications/templates', 0, {
						'X-Tenant': tenant,
						'Accept': smsAcceptHeader
					})
						.then(function (response) {
							let smsTemplates = response.data.map((sms) => {
								sms.isSms = true;
								return sms
							});
							$scope.templates.push.apply($scope.templates, smsTemplates);
						});

					$scope.addActionsBuilder = function (event, type) {
						$scope.event.actions.push({
							template: {
								slug: '',
								version: null
							},
							trigger: {
								condition: "AND",
								rules: [{
									xpath: ""
								}]
							},
							locale: [{
								source: 'JMS',
								point: {
									query: '',
									value: 'STRING_VALUE'
								}
							}, {
								source: 'JMS',
								point: {
									query: '',
									value: 'STRING_VALUE'
								}
							}]
						});
						var index = $scope.event.actions.length - 1;
					};

					$scope.orderAscDesc = function (object) {
						if (object.order === 'ASCENDING') {
							object.order = 'DESCENDING';
						} else {
							object.order = 'ASCENDING';
						}
					};

					$scope.editEvent = function ($event) {
						var requestEvent = DataService.transformEvent(JSON.parse(JSON.stringify($scope.event)), '', true),
							$button = angular.element($event.currentTarget).find('#submitEvent'),
							requestURL = (slug) ? `${ENDPOINTS.JMS}/${slug}` : ENDPOINTS.JMS,
							contentType = (slug) ? 'application/x.com.media-saturn.rea.event-update+json' : 'application/x.com.media-saturn.rea.new-event+json';
						$button.toggleClass('showSpinner');
						$button.disabled = true;
						$scope.history = 0;
						// set original event to last modified version
						originalEvent = JSON.parse(JSON.stringify($scope.event));

						var saveEvent = function () {
							DataService.putData(requestURL, requestEvent, 'POST', {
								'Content-Type': contentType,
								'X-Tenant': tenant
							})
								.then(function (response) {
									AlertService.add('success', 'Event was updated');
									$button.toggleClass('showSpinner');
									$button.disabled = false;
									$scope.isDirty = true;
									if (!slug) {
										$state.go('app.events');
									}
								}, function (reason) {
									AlertService.add('danger', 'Event was not updated');
									$button.toggleClass('showSpinner');
									$button[0].disabled = false;
								});
						};

						if ($scope.vm.availableVariables.length > 0) {
							var modalInstance = $uibModal.open({
								templateUrl: "views/components/modal/event-unassiged-variables.html",
								size: 'md',
								resolve: {
									saveEvent: function () {
										return saveEvent;
									}
								},
								controller: ['$scope', '$uibModalInstance', 'saveEvent', function ($scope, $uibModalInstance, saveEvent) {
									$scope.save = function () {
										saveEvent();
										$uibModalInstance.close('cancel');
									};
									$scope.close = function () {
										$uibModalInstance.close('cancel');
										$button.toggleClass('showSpinner');
										$button[0].disabled = false;
									};
								}]
							});
						} else {
							saveEvent();
						}
					};

					$scope.$on('templateChanged', function () {
						getAvailableVariables();
					});
				}

				/* General for all event states (create/edit) */
				$scope.testEvent = function (file, $event) {
					var requestURL,
						requestPayload,
						$button,
						requestHeaders = {
							'X-Tenant': tenant
						};

					if (slug) {
						requestHeaders['Content-Type'] = 'application/xml';
						requestURL = `${ENDPOINTS.JMS}/${slug}`;
						requestPayload = file;
					} else {
						requestHeaders['Content-Type'] = 'application/x.com.media-saturn.rea.preview-event+json';
						requestURL = ENDPOINTS.JMS;
						requestPayload = DataService.transformEvent(JSON.parse(JSON.stringify($scope.event)), true);
						requestPayload.xml = file;
					}

					$event.preventDefault();
					$button = angular.element($event.currentTarget);
					$button.toggleClass('showSpinner');
					$button[0].disabled = 1;
					DataService.putData(requestURL, requestPayload, 'POST', requestHeaders)
						.then(function (response) {
							AlertService.add('success', 'Event succesfully triggered');
							$button.toggleClass('showSpinner');
							$button[0].disabled = 0;
						}, function (reason) {
							AlertService.add('danger', 'Event not triggered');
							$button.toggleClass('showSpinner');
							$button[0].disabled = 0;
						});
				};

				let publish = function() {
					let endpoint = `${ENDPOINTS.JMS}/${slug}/published`;
					DataService.putData(endpoint, '',
						'POST', {
							'X-Tenant': tenant
						})
						.then(response => {
							$scope.isDirty = false;
							AlertService.add('success', 'Event was successfully published');
						}, function () {
							AlertService.add('danger', 'There was a problem publishing the event');
						});
				};

				let discard = function() {
					let endpoint = `${ENDPOINTS.JMS}/${slug}/discard`;
					DataService.putData(endpoint, '',
						'POST', {
							'X-Tenant': tenant
						})
						.then(() => {
							$scope.isDirty = false;
							AlertService.add('success', 'Event changes were successfully discarded');
							$state.go('app.events')
						}, function () {
							AlertService.add('danger', 'There was a problem discarding the changes');
						});
				};

				$scope.publish = function () {
					let modalInstance = $uibModal.open({
						animation: true,
						backdrop: 'static',
						component: 'publishModal',
						resolve: {
							publish: function() {
								return publish
							}
						}
					});
				};

				$scope.discard = function () {
					let modalInstance = $uibModal.open({
						animation: true,
						backdrop: 'static',
						component: 'discardModal',
						resolve: {
							discard: function() {
								return discard
							}
						}
					});
				};
			}
		]);
