eventsModule
    .component('eventAction', {
        bindings: {
            item: "<",
            templates: "<",
            documents: "<",
            files: "<"
        },
        templateUrl: "app/component/event-action/event-action.component.html",
        controller: function ($scope, countries) {
            this.languages = countries
            this.pdfVersions = [];
            this.g = 6
            // // watchers 
            this.$onInit = () => {
                console.log(444, this.languages)

                if (this.item.type == "EMAIL" && !this.item.attachments)
                    this.item.attachments = [];

                $scope.$watch('templates',  (newValue, oldValue) => {
                    this.updateVersionsAndType(this.item.template, this.templates);
                });

                $scope.$watch('item.template.version', (newValue, oldValue) =>{
                    if (oldValue !== newValue && this.item.template.version != null)
                        $scope.$emit('templateChanged');
                });

                
                this.updateVersionsAndType = (selectedTemplate, existingTemplates) => {
                    if (existingTemplates) {
                        existingTemplates.forEach((template) => {
                            if (selectedTemplate.slug == template.slug) {
                                this.templateVersions = template.versions;
                                console.log(2, template.slug)
                                // if SMS set item.type as SMS
                                this.item.type = (template.isSms !== undefined && template.isSms === true)? "SMS":"EMAIL";
                            }
                        });
                    }
                }

            }

            this.languageSelect = {
                isOpen: false,
                key: ''
            };

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

            this.setLanguage = (language, item, isopen) => {
                item.defaultLocale = language;
                this.languageSelect.isOpen = false;
                this.languageSelect.key = '';
            };

            this.clear = ($event) => {
                $event.preventDefault();
                $event.stopPropagation();
                this.languageSelect.key = '';
            };

            this.addDocuments = () => {
                var attachment = {
                    type: 'URL'
                };
                this.item.attachments.push(attachment);
            };
          
        },
        controllerAs:"actionCtrl"

    });