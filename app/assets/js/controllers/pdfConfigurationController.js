angular
    .module('app')
    .controller(
        'pdfConfigurationController', [
            '$scope',
            '$state',
            'DataService',
            'tenantService',
            'AlertService',
            'countries',
            'generalServices',
            '$transitions',

            (
                $scope,
                $state,
                DataService,
                tenantService,
                AlertService,
                countries,
                generalServices,
                $transitions

            ) => {

                let tenant = tenantService.getTenant(),
                    resendUrl = '/sterling-documents-ws/documentoverrides/',
                    templatesUrl = '/documents/templates',
                    language = tenantService.getLanguage(tenant);

                const danger = 'There was a problem processing your request!';
				// List of all languages for language dropdown
                $scope.languages = countries;

                $scope.languageSelect = {
                    'isOpen': false
                };

                /**
                 * Set current language
                 * @param {String} language ISO2 language
                 * @return {Void}
                 */
                $scope.setLanguage = (language) => {
                    $scope.languageSelect.isOpen = false;
                    $scope.languageSelect.language = language;
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
                        'X-Tenant': tenant,
                        'Accept-Language': language
                    })
                    .then((templates) => {
                        DataService.getData(resendUrl, 0, {
                                'Accept': 'application/x.com.media-saturn.rea.document-overrides+json',
                                'X-Tenant': tenant
                            })
                            .then((resend) => {
                                //Merge list of template and watermark by slug
                                $scope.templates = templates.data.map(
                                    x => Object.assign(
                                        x, resend.data.find(
                                            y => y.slug == x.slug)
                                    )
                                );
                            })
                    });

                let updateTemplateConfiguration = (template, payload, $element) => {
                    return DataService.putData(
                        resendUrl + template.slug, payload,
                        'POST', {
                            'Content-Type': 'application/x.com.media-saturn.rea.document-overrides+json',
                            'X-Tenant': tenant
                        });
                };

                let getPayload = (template) => {
                    let payload = {
                        watermarkTranslations: {}
                    };
                    if (_.keys(template.watermarkTranslations).length > 0) {
                        payload.watermarkTranslations = JSON.parse(JSON.stringify(template.watermarkTranslations))
                    };
                    return payload;
                };
                /**
                 * toggles new watermark form
                 * @param {Object} template
                 * @return {Void}
                 */
                $scope.addWatermark = (template) => {
                    if (!template) template = {};
                    template.watermarkConfig = {
                        new: true,
                        watermark: null,
                        language: null
                    };
                };

                /**
                 * edit watermark by $index
                 * @param  {Number} $index index of the selected watermark
                 * @return {Void}
                 */
                $scope.editWatermark = (template, $index, key) => {
                    template.watermarkConfig = {
                        selected: $index,
                        edit: true,
                        watermark: null,
                        backup: template.watermarkTranslations[key]
                    }
                };

                /**
                 * close edit/add new watermark
                 * @param  {Object} template
                 * @return {Void}
                 */
                $scope.cancelWatermark = (template, key) => {
                    if (template.watermarkConfig.edit == true)
                        template.watermarkTranslations[key] = template.watermarkConfig.backup;

                    template.watermarkConfig = {
                        new: false,
                        language: null
                    };
                };

                /**
                 * Save newly added watermark
                 * @param  {Object} template
                 * @param  {Object} $event   Click event
                 * @return {Void}
                 */
                $scope.updateWatermark = (template, $event) => {
                    let $element = angular.element($event.currentTarget).closest(".card");
                    $element.toggleClass('showSpinner');

                    // If no watermark translation exists, create an empty one
                    if (!template.watermarkTranslations) template.watermarkTranslations = {};
                    if (template.watermarkConfig && template.watermarkConfig.watermark) template.watermarkTranslations[$scope.languageSelect.language] = template.watermarkConfig.watermark;
                    let payload = getPayload(template);
                    updateTemplateConfiguration(template, payload, $element)
                        .then((response) => {
                            AlertService.add('success', 'Watermark was succesfully updated');
                            $element.toggleClass('showSpinner');
                            template.watermarkConfig = {
                                new: false,
                                watermark: null,
                                language: null
                            };
                        }, () => {
                            AlertService.add('danger', danger);
                            $element.toggleClass('showSpinner');
                        });
                };

                $scope.removeWatermark = (template, key, $event) => {
                    let $element = angular.element($event.currentTarget).closest(".card");
                    $element.toggleClass('showSpinner');

                    delete template.watermarkTranslations[key];
                    let payload = getPayload(template);
                    updateTemplateConfiguration(template, payload, $element)
                        .then((response) => {
                            AlertService.add('success', 'Watermark was succesfully updated');
                            $element.toggleClass('showSpinner');
                            if (template.watermarkConfig && template.watermarkConfig.watermark) template.watermarkTranslations[$scope.languageSelect.language] = template.watermarkConfig.watermark;
                            template.watermarkConfig = {
                                new: false,
                                watermark: null,
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
                /* Reload list on language change */
                $scope.$on('languageChanged', () => $state.reload());

                $transitions.onError({}, function(transition) {
                    return console.log("Error while leaving 'home' state: " + transition.error());
                });
            }
        ]
    );
