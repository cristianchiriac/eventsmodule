eventsModule
    .component('documents', {
        bindings: {
            documents: "<",
            files: "<",
            document: "<",
            object: "<",
            onDocumentRemove: "&",
            onDocumentAdd: "&"
        },
        templateUrl: "app/component/documents/documents.component.html",
        controller:  function ($scope) {
        
            this.documentSources = [{
                name: 'File',
                value: 'UPLOADED_FILE'
            }, {
                name: 'URL',
                value: 'URL'
            }, {
                name: 'Template',
                value: 'TEMPLATE'
            }];

            this.fileVersions = [];
            this.pdfVersions = [];


            this.getPdfVersions = (selectedDocument)  => {
                let existingDocuments = this.documents;

                if (existingDocuments) {
                    existingDocuments.forEach((document) => {
                        if (selectedDocument.slug == document.slug) {
                            this.pdfVersions = document.versions;
                        }
                    });
                }
            };

            this.getFileVersions = (selectedTemplate) => {
                let existingFiles = this.files;
                if (existingFiles) {
                    existingFiles.forEach((file) => {
                        if (selectedTemplate.slug === file.slug) {
                            this.fileVersions = file.versions;
                        }
                    });
                }
            }              

            this.addNewDocument = () => {
                var attachment = {
                    type: 'URL'
                };
                this.object.attachments.push(attachment);
            }

            this.addConditions = () => {
                var newRuleGroup = {
                    "condition": "",
                    "rules": [
                        {}
                    ]
                }
                this.document.trigger = newRuleGroup
            }

            this.deleteDocument = () => {
                this.onDocumentRemove();
            }
        },
        controllerAs: "documentsCtrl"
    });