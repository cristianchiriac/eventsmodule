angular
    .module('app')
    .controller('searchController', ['$scope', '$state', '$stateParams', '$location', 'generalServices', 'DataService', '$http', '$uibModal', 'searchService', '$localStorage', '$timeout',
        function($scope, $state, $stateParams, $location, generalServices, DataService, $http, $uibModal, searchService, $localStorage, $timeout) {
            var urlParameters = $location.search(),
                languageCode = '_de',
                distributionChannel = ($stateParams.distributionChannel && $stateParams.distributionChannel.match(languageCode)) ? $stateParams.distributionChannel : $stateParams.distributionChannel + languageCode,
                audienceUrl = `/api/jms/audience/${$stateParams.channel}`, emailsUrl, pdfsUrl, notificationsUrl, template, headers = {};

            $scope.searching = {
                oldFlow: false,
                newFlow: false
            };
            $scope.error = null;
            $scope.vm.emails = [];
            $scope.documents = null;

            /* Set X-Tenant header */
            if ($stateParams.distributionChannel) {
                headers['X-Tenant'] = $stateParams.distributionChannel
                    .toLowerCase()
                    .replace(languageCode, '')
                    .split('_')
                    .join('');
            }

            /* Set Authorization header */
            if ($localStorage.token) {
                headers['Authorization'] = `Bearer ${$localStorage.token.token}`;
            } else {
                $state.go('appSimple.auth');
            }

            /* temporary orderId to orderNumber switch */
            $stateParams.distributionChannel = distributionChannel;
            if ($stateParams.orderNumber) {
                // old search
                $stateParams.orderId = $stateParams.orderNumber;
                $stateParams.orderNumber = null;
            } else if (urlParameters.orderId) {
                // new search
                $stateParams.orderId = urlParameters.orderId;
            }

            /* build url for old email search */
            emailsUrl = generalServices.buildURL(
                $stateParams,
                '/api/notifications-resend/legacy', ['channel', 'isMigrated']
            );

            /* build url for documents search */
            pdfsUrl = generalServices.buildURL(
                $stateParams,
                '/api/notifications-resend/legacy/pdf', ['channel']
            );

            /* build url for notification search */
            notificationsUrl = generalServices.buildURL(
                urlParameters,
                '/api/notifications/notifications/history', ['distributionChannel', 'channel', 'isMigrated']
            );

            if (!$stateParams.channel) {
                $scope.searching = {
                    oldFlow: true,
                    newFlow: true
                };
                $scope.error = {
                    title: 'No channel has been specified',
                    text: 'In order to perform your search, please specify the channel (eg. c70)',
                    type: 'callout-info'
                }
            }
            if ($stateParams && $stateParams.channel && $localStorage.token) {
                headers['X-Channel'] = $stateParams.channel;
                /* get audience based on channel then perform search */
                $timeout(() => {
                    $http.get(audienceUrl, {
                            headers: headers
                        })
                        .then(
                            response => {
                                headers['X-Audience'] = response.data.audience;
                                // get old flow emails
                                if ($stateParams.distributionChannel && $stateParams.orderId && $stateParams.channel === 'C01') {
                                    searchService.getOutbound(
                                            emailsUrl,
                                            headers
                                        )
                                        .then(
                                            response => {
                                                $scope.searching.oldFlow = true;
                                                $scope.vm.emails = _.union(
                                                    $scope.vm.emails,
                                                    response
                                                );
                                            }, (reason) => {
                                                $scope.searching.oldFlow = true;
                                                $scope.error = {
                                                    title: 'No results found with the given input.',
                                                    type: 'callout-info'
                                                }
                                            });
                                } else {
                                    $scope.searching.oldFlow = true;
                                }
                                // get new flow emails
                                if (urlParameters && Object.keys(urlParameters).length > 0) {
                                    searchService.getNotifications(notificationsUrl, headers)
                                        .then(
                                            response => {
                                                if (response.length > 0) {
                                                    $scope.vm.emails = _.union(
                                                        $scope.vm.emails,
                                                        response
                                                    );
                                                } else {
                                                    $scope.error = {
                                                        title: 'No results found with the given input.',
                                                        type: 'callout-info'
                                                    }
                                                }
                                                $scope.searching.newFlow = true;
                                            }, (reason) => {
                                                $scope.searching.newFlow = true;
                                                $scope.error = {
                                                    title: `${reason.statusText}`,
                                                    text: 'No results found with the given input.',
                                                    type: 'callout-info'
                                                }
                                            });
                                }
                                // get migrated documents
                                if ($stateParams.distributionChannel && $stateParams.orderId && $stateParams.isMigrated && $stateParams.channel === 'C01') {
                                    searchService.getMigratedDocuments(pdfsUrl, headers)
                                        .then(
                                            response => {
                                                $scope.vm.documents = response;
                                            }
                                        )
                                }
                            }, (reason) => {
                                $scope.searching.oldFlow = true;
                                $scope.searching.newFlow = true;
                                $scope.error = {
                                    title: `${reason.statusText}`,
                                    text: `${reason.data.message}`,
                                    type: 'callout-info'
                                }
                            })
                }, 400)
            }

            $scope.getPreview = function(item, type, $event) {
                var itemID = item.id || item;
                switch (type) {
                    case 'attachments':
                        var url = (item.filename) ? `/notifications-resend/legacy/pdf/${itemID}/content` : `/notifications/notifications/${item.id}/attachment/${item.attachment.fileName}`,
                            responseType = 'arraybuffer';
                        headers['Accept'] = 'application/pdf';
                        break;
                    default:
                        url = ((item.source == 'outboundemail') ? '/notifications-resend/legacy/' : '/notifications/notifications/') + item.id;
                        responseType = 'json';
                        headers['Accept'] = (item.source == 'outboundemail') ? 'application/json' : 'application/x.com.media-saturn.rea.full-email+json';
                }

                generalServices.getPDF(url, responseType, headers)
                    .then(function(response) {
                        var previewAvailable = true,
                            modalInstance;
                        switch (type) {
                            case 'attachments':
                                var blob = generalServices.base64ToBlob(response.data);
                                template = '<embed src="' + generalServices.base64ToBlob(response.data) + '" width="100%" height="800"></embed>';
                                break;
                            default:
                                template = (item.source == 'outboundemail') ? response.data.text : response.data.body.content;
                                if (template.length < 5) {
                                    previewAvailable = false;
                                    template = `<div style="padding: 20px;">
                                                  No preview available for: <br>
                                                  <strong>${item.subject}</strong>
                                                </div>`;
                                }
                        }

                        if (type === 'attachments') {
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                window.navigator.msSaveOrOpenBlob(blob);
                            } else {
                                modalInstance = $uibModal.open({
                                    size: 'lg',
                                    template: '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="close()"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">' + template + "</div>",
                                    windowClass: 'extra-large',
                                    controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                                        $scope.close = function() {
                                            $uibModalInstance.close('cancel');
                                        };
                                    }],
                                }).result.then(() => {}, (res) => {});

                            }
                        } else {
                            modalInstance = $uibModal.open({
                                size: previewAvailable ? 'lg' : 'md',
                                template: '<div class="modal-body"><button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="close()"><span aria-hidden="true">&times;</span></button>' + template + "</div>",
                                windowClass: previewAvailable ? 'extra-large template-preview' : 'normal',
                                controller: ['$uibModalInstance', '$scope', function($uibModalInstance, $scope) {
                                    $scope.close = function() {
                                        $uibModalInstance.close('cancel');
                                    };
                                }],
                            }).result.then(() => {}, (res) => {});
                        }
                    });
            };
            $scope.resend = function(item, $event, migrated) {
                var itemID = '',
                    resendUrl = '',
                    to = '';
                switch (migrated) {
                    case 1:
                        resendUrl = '/notifications-resend/legacy/resend/aroma/';
                        itemID = item.uuid;
                        to = item.email ? '{"toAddress":"' + item.email + '", "firstName":"' + item.firstName + '", "lastName": "' + item.lastName + '"}' : {};
                        break;
                    default:
                        resendUrl = (item.notification) ? '/notifications-resend/notifications/' : '/notifications-resend/legacy/resend/';
                        itemID = item.id;
                        to = item.email ? '{"to": ["' + item.email + '"]}' : [];
                        if (item.notification) {
                            headers['Content-Type'] = 'application/x.com.media-saturn.rea.recipients-overrides+json'
                        } else {
                            headers['Content-Type'] = 'application/json';
                        };
                }
                var $button = angular.element($event.currentTarget);
                $button.toggleClass('showSpinner');
                var modalInstance = $uibModal.open({
                    size: 'md',
                    templateUrl: 'views/components/modal/resend-confirmation.html',
                    windowClass: 'resend',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    },
                    controller: ['$uibModalInstance', '$scope', 'item', function($uibModalInstance, $scope, item) {
                        $scope.item = item;
                        headers['Accept'] = 'application/json';
                        headers['X-Channel'] = $stateParams.channel;
                        $scope.resend = function() {
                            DataService.putData(resendUrl + itemID, to, 'POST', headers)
                                .then(function(response) {
                                    $scope.showSuccess = true;
                                }, function(reason) {
                                    $scope.showError = true;
                                });
                        };
                        $scope.close = function() {
                            $button.removeClass('showSpinner');
                            $uibModalInstance.dismiss('cancel');
                        };
                    }],
                });
                modalInstance.result.then(function(selectedItem) {}, function() {
                    $button.removeClass('showSpinner');
                });
            };

        }
    ]);