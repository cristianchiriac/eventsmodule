angular
    .module('app')
    .controller(
        'resendController', [
            '$scope',
            '$state',
            'DataService',
            'tenantService',
            'AlertService',
            'countries',

            (
                $scope,
				$state,
                DataService,
				tenantService,
                AlertService,
                countries

            ) => {

                let tenant = tenantService.getTenant(),
                    resendUrl = '/notifications-resend/notifications',
                    templatesUrl = '/notifications/templates';

                const danger = 'There was a problem processing your request!';

                // List of all languages for language dropdown
                $scope.languages = countries;

                $scope.languageSelect = {
                    'isOpen': false
                };

                // Configuration for scrollbars
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

                DataService.getData(templatesUrl, 0, {
                        'X-Tenant': tenant
                    })
                    .then((templates) => {
                        DataService.getData(resendUrl, 0, {
                                'Accept': 'application/x.com.media-saturn.rea.notification-overrides+json',
                                'X-Tenant': tenant
                            })
                            .then((resend) => {
                                // Merge list of template and resend subjects by slug
                                $scope.templates = templates.data.map(
                                    x => Object.assign(
                                        x, resend.data.find(
                                            y => y.slug == x.slug)
                                    )
                                );
                            });
                    });

                /**
                 * Sends all subjects of a template to be saved
                 * @param  {Object} template
                 * @param  {Object} payload         List of all subjects
                 * @param  {HTMLElement} $element   Element containing spinner
                 * @return {Void}
                 */
                let updateSubject = (template, payload, $element) => {
                    return DataService.putData(
                        resendUrl + '/' + template.slug, payload,
                        'POST', {
                            'Content-Type': 'application/x.com.media-saturn.rea.email-resend-overrides+json',
                            'X-Tenant': tenant
                        });
                };

                let getPayload = (template) => {
                    let payload = {
                        subjectTranslations: {}
                    };
                    if (_.keys(template.subjectTranslations).length > 0) {
                        payload.subjectTranslations = JSON.parse(JSON.stringify(template.subjectTranslations))
                    }
                    return payload;
                };

                /**
                 * edit subject by $index
                 * @param  {Number} $index index of the selected subject
                 * @return {Void}
                 */
                $scope.edit = (template, $index, key) => {
                    template.resend = {
                        selected: $index,
                        edit: true,
                        subject: null,
                        backup: template.subjectTranslations[key]
                    }
                };

                /**
                 * close edit/add new subject
                 * @param  {Object} template
                 * @return {Void}
                 */
                $scope.cancel = (template, key) => {
                    if(template.resend.edit == true)
                        template.subjectTranslations[key] = template.resend.backup;
                    template.resend = {
                        new: false,
                        language: null
                    };
                };

                /**
                 * toggles new subject form
                 * @param {Object} template
                 * @return {Void}
                 */
                $scope.addSubject = (template) => {
                    if (!template) template = {};
                    template.resend = {
                        new: true,
                        subject: null,
                        language: null
                    };
                }

                /**
                 * Set current language
                 * @param {String} language ISO2 language
                 * @return {Void}
                 */
                $scope.setLanguage = (language) => {
                    $scope.languageSelect.isOpen = false;
                    $scope.languageSelect.language = language;
                };

                /**
                 * Save newly added subject
                 * @param  {Object} template
                 * @param  {Object} $event   Click event
                 * @return {Void}
                 */
                $scope.update = (template, $event) => {
                    let $element = angular.element($event.currentTarget).closest(".card");
                    $element.toggleClass('showSpinner');

                    // If no subject translation exists, create an empty one
                    if (!template.subjectTranslations) template.subjectTranslations = {};
                    if (template.resend && template.resend.subject) template.subjectTranslations[$scope.languageSelect.language] = template.resend.subject;
                    let payload = getPayload(template);
                    updateSubject(template, payload, $element)
                        .then((response) => {
                            AlertService.add('success', 'Resend subject was succesfully updated');
                            $element.toggleClass('showSpinner');
                            template.resend = {
                                new: false,
                                subject: null,
                                language: null
                            };
                        }, () => {
                            AlertService.add('danger', danger);
                            $element.toggleClass('showSpinner');
                        });
                };

                $scope.remove = (template, key, $event) => {
                    let $element = angular.element($event.currentTarget).closest(".card");
                    $element.toggleClass('showSpinner');

                    delete template.subjectTranslations[key];
                    let payload = getPayload(template);
                    updateSubject(template, payload, $element)
                        .then((response) => {
                            AlertService.add('success', 'Resend subject was succesfully updated');
                            $element.toggleClass('showSpinner');
                            if (template.resend && template.resend.subject) template.subjectTranslations[$scope.languageSelect.language] = template.resend.subject;
                            template.resend = {
                                new: false,
                                subject: null,
                                language: null
                            };
                        }, () => {
                            AlertService.add('danger', danger);
                            $element.toggleClass('showSpinner');
                        });
                };

                $scope.translationsLength = (template) => {
                    return _.keys(template).length > 0;
                };

				/* Reload list on tenant change */
				$scope.$on('tenantChanged', () => $state.reload());
        }
    ]);