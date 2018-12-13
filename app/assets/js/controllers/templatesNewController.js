angular.module('app')
    .controller(
        'templatesNewController', [
            '$scope',
            '$state',
            '$localStorage',
            'DataService',
            'tenantService',
            'generalServices',
            'AlertService',
            'defaults',
            'templateService',

            function(
                $scope,
                $state,
                $localStorage,
                DataService,
				tenantService,
                generalServices,
                AlertService,
                defaults,
				templateService
            ) {

                let endpoint = `/${$state.params.type}/templates`,
                    contentType = ($state.params.type == 'notifications') ? 'application/x.com.media-saturn.rea.new-email-template+json' : 'application/x.com.media-saturn.rea.new-pdf-template+json',
                    tenant = tenantService.getTenant(),
                    language = $scope.language || tenant.toUpperCase(),
                    requestBody;

                /* Empty localStorage of editor related data so that we are sure that we start
                   off with a blank canvas */
                for (let item in localStorage) {
                    if (item.substring(0, 4) === 'gjs-') localStorage.removeItem(item);
                }

                $scope.type = $state.params.type;

                /* Set list of available languages */
                $scope.languages = generalServices.getCountryLanguage(tenant);

                $scope.template = {
                    subject: null,
                    body: null,
                    saved: false
                };

                /* Configuration for dropdown-menu scrollbars */
                $scope.scrollbarsConfig = {
                    autoHideScrollbar: false,
                    theme: 'minimal-dark',
                    axis: 'y',
                    advanced: {
                        updateOnContentResize: true
                    },
                    scrollInertia: 300,
                    setHeight: 300,
                };

                /**
                 * Set the language that is selected in the dropdown-menu
                 * @param {String} language Language in alfa2 format + country (eg. de_AT)
                 * @return {Void}
                 */
                $scope.setLanguage = (language) => {
                    $scope.language = language;
                    $scope.isopen = false;
                    $scope.key = '';
                };

                /**
                 * Clear the key that is used to filter the list of languages
                 * @param  {Object} $event Object containing all event related data
                 * @return {Void}
                 */
                $scope.clear = ($event) => {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.key = '';
                };

                $scope.toggleLanguageMenu = ($event) => {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.isopen = true;
                    $scope.key = '';
                    generalServices.toggleLanguageMenu($event);
                };

                /**
                 * Save the current template
                 * @param  {String} content string representing the content of the canvas
                 * @return {void}
                 */
                $scope.save = (content) => {
                    let request = {};

                    if ((!$scope.template.subject && $state.params.type == 'notifications') || !$scope.template.name || !$scope.language) {
                        $scope.template.saved = true;
                        return $scope.$apply();
                    }

                    request.newContent = generalServices
                        .setComponents(
                            content,
                            $scope.template.body,
                            $scope.language
                        );

                    $scope.template.translations = {};
                    $scope.template.translations[$scope.language] = templateService
                        .getTranslations(
                            content,
                            language
                        );

                    if ($state.params.type == 'notifications') {
                        $scope.template.translations[$scope.language].subject = templateService.createTranslationField($scope.template.subject);
                        requestBody = {
                            body: request.newContent,
                            type: 'text/html',
                            headers: {},
                            name: $scope.template.name,
                            subject: '[(#{subject})]',
                            translations: $scope.template.translations
                        };
                    } else {
                        let footer = generalServices
                            .extractContent(
                                request, {
                                    'id': 'footer'
                                },
                                true
                            );

                        let header = generalServices
                            .extractContent(
                                request, {
                                    'id': 'header'
                                },
                                true
                            );
                        requestBody = {
                            content: request.newContent,
                            footer: (footer) ? footer.outerHTML : '',
                            header: (header) ? header.outerHTML : '',
                            name: {
                                [$scope.language]: $scope.template.name
                            },
                            translations: $scope.template.translations
                        };
                    }
                    DataService.putData(
                            endpoint, requestBody,
                            'POST', {
                                'Content-Type': contentType,
                                'If-Match': $localStorage.draftVersion,
                                'X-Tenant': tenant,
                                'Accept-Language': $scope.language
                            })
                        .then(
                            response => {
                                AlertService.add(
                                    'success',
                                    'Template was saved as a draft and is pending approval'
                                );
                                $localStorage.draftVersion = response.headers().version;
                                $localStorage.draft = true;
                                $state.go('appAside.templates-edit', {
                                    type: $state.params.type,
                                    slug: DataService.slugify($scope.template.name)
                                });
                            },
                            reason => {
                                if (reason.status == 409)
                                    reason.message = ` Template "${reason.config.data.name}" already exists`;
                                AlertService.add(
                                    'danger',
                                    `Error ${reason.status}: ${reason.statusText}; ${reason.message}`
                                );
                            }
                        );
                };

            }
        ]);