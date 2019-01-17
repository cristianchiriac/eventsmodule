eventsModule
    .component('eventAction', {
        bindings: {
            item: "<",
            templates: "<",
            documents: "<",
            files: "<",
            onActionRemove: '&'
        },
        templateUrl: "app/component/event-action/event-action.component.html",

        controller: function ($scope, countries) {

            this.languages = countries

            this.languageSelect = {
                isOpen: false,
                key: ''
            };

            this.templateVersions = []

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

            this.updateVersionsAndType = (selectedTemplate) => {
                let existingTemplates = this.templates;

                if (existingTemplates) {
                    existingTemplates.forEach((template) => {
                        if (selectedTemplate.slug == template.slug) {
                            this.templateVersions = template.versions;
                        }
                    });
                }
            }

            this.deleteAction = () => {
                this.onActionRemove();
            }

            this.addAttachment = () => {
                let newAttachment = {}
                this.item.attachments.unshift(newAttachment)
            }

            this.removeDocument = (index) => {
                this.item.attachments.splice(index, 1);
            }

            this.setLanguage = (language, item) => {
                item.defaultLocale = language;
                this.languageSelect.isOpen = false;
                this.languageSelect.key = '';
            }

            this.$onInit = () => {
                this.recipients = {
                    'To': this.item.to,
                    'BCC': this.item.bcc,
                    'CC': this.item.cc
                }
            }



        },
        controllerAs: "actionCtrl"

    });