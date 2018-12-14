eventsModule
    .component('eventAction', {
        bindings: {
            item: "<"
        },
        templateUrl: "app/component/event-action/event-action.component.html",
        controller: function ($scope) {
            // scope.index = scope.$eval(attributes.index);
            // scope.type = scope.$eval(attributes.type);
            // this.languages = [{language: "af_ZA", country: "Afrikaans - South Africa", isonumeric: 436, alfa3: "AFK", $$hashKey: "object:224"}, {language: "af_ZA", country: "Afrikaans - South Africa", isonumeric: 436, alfa3: "AFK", $$hashKey: "object:224"}];
            // this.pdfVersions = [];

            // $scope.$watch('item.template.slug', function (newValue, oldValue) {
            //     if (newValue !== oldValue) {
            //         this.item.template.version = null;
            //         if (this.item.type === "EMAIL" && !this.item.attachments)
            //             this.item.attachments = [];
            //         if (this.item.type === "SMS" && this.item.attachments)
            //             delete this.item.attachments;
            //     }
            // });
            // $scope.$watch('templates', function (newValue, oldValue) {
            //    this.updateVersionsAndType(this.item.template, this.templates);
            // });
            // $scope.$watch('item.template.version', function (newValue, oldValue) {
            //     if (oldValue !== newValue && this.item.template.version != null)
            //         $scope.$emit('templateChanged');
            // });

            // /* Add attachments field if is email and field doesn't exists */
            // if (this.item.type == "EMAIL" && !this.item.attachments)
            //     this.item.attachments = [];

            // /* Configuration for language select */
            // this.languageSelect = {
            //     isOpen: false,
            //     key: ''
            // };

            // /* Configuration for dropdown-menu scrollbars */
            // this.scrollbarsConfig = {
            //     autoHideScrollbar: false,
            //     theme: 'minimal-dark',
            //     axis: 'y',
            //     advanced: {
            //         updateOnContentResize: true
            //     },
            //     scrollInertia: 300,
            //     setHeight: 300,
            // };

            // this.setLanguage = (language, item, isopen) => {
            //     item.defaultLocale = language;
            //     this.languageSelect.isOpen = false;
            //     this.languageSelect.key = '';
            // };

            // this.clear = ($event) => {
            //     $event.preventDefault();
            //     $event.stopPropagation();
            //     this.languageSelect.key = '';
            // };

            // this.updateVersionsAndType = (selectedTemplate, existingTemplates) => {
            //     if (existingTemplates) {
            //         existingTemplates.forEach((template) => {
            //             if (selectedTemplate.slug == template.slug) {
            //                 this.templateVersions = template.versions;
            //                 // if SMS set item.type as SMS
            //                 this.item.type = (template.isSms !== undefined && template.isSms === true) ? "SMS" : "EMAIL";
            //             }
            //         });
            //     }
            // }
            // this.addDocuments = function () {
            //     var attachment = {
            //         type: 'URL'
            //     };
            //     this.item.attachments.push(attachment);
            // };


        }
    });