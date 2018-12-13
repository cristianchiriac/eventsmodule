angular
    .module('app')
    .directive("eventAction", ['countries', function(countries) {
        return {
            templateUrl: 'assets/js/directives/event/eventAction/add-source.html',
            scope: false,
            link: function(scope, element, attributes) {
                scope.index = scope.$eval(attributes.index);
                scope.type = scope.$eval(attributes.type);
                scope.languages = countries;
                scope.pdfVersions = [];

                scope.$watch('item.template.slug', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        scope.item.template.version = null;
                        if (scope.item.type === "EMAIL" && !scope.item.attachments)
                            scope.item.attachments = [];
                        if (scope.item.type === "SMS" && scope.item.attachments)
                            delete scope.item.attachments;
                    }
                });
                scope.$watch('templates', function(newValue, oldValue) {
                    scope.updateVersionsAndType(scope.item.template, scope.templates);
                });
                scope.$watch('item.template.version', function(newValue, oldValue) {
                    if (oldValue !== newValue && scope.item.template.version != null)
                        scope.$emit('templateChanged');
                });

                /* Add attachments field if is email and field doesn't exists */
                if (scope.item.type == "EMAIL" && !scope.item.attachments)
                    scope.item.attachments = [];

                /* Configuration for language select */
                scope.languageSelect = {
                    isOpen: false,
                    key: ''
                };

                /* Configuration for dropdown-menu scrollbars */
                scope.scrollbarsConfig = {
                    autoHideScrollbar: false,
                    theme: 'minimal-dark',
                    axis: 'y',
                    advanced: {
                        updateOnContentResize: true
                    },
                    scrollInertia: 300,
                    setHeight: 300,
                };

                scope.setLanguage = (language, item, isopen) => {
                    item.defaultLocale = language;
                    scope.languageSelect.isOpen = false;
                    scope.languageSelect.key = '';
                };

                scope.clear = ($event) => {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.languageSelect.key = '';
                };

                scope.updateVersionsAndType = (selectedTemplate, existingTemplates) => {
                    if (existingTemplates) {
                        existingTemplates.forEach((template) => {
                            if (selectedTemplate.slug == template.slug) {
                                scope.templateVersions = template.versions;
                                // if SMS set item.type as SMS
                                scope.item.type = (template.isSms !== undefined && template.isSms === true)? "SMS":"EMAIL";
                            }
                        });
                    }
                }
                scope.addDocuments = function() {
                    var attachment = {
                        type: 'URL'
                    };
                    scope.item.attachments.push(attachment);
                };
            }
        };
    }]);