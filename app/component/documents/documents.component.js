eventsModule
    .component('documents', {
        bindings: {
            documents: "<",
            files: "<",
            document: "<",
            object: "<"
        },
        templateUrl: "app/component/documents/documents.component.html",
        controller: function ($scope) {

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

            this.$onInit = () => {
                console.log('doc', this.document)
                $scope.$watch('document.template.slug', function (newValue, oldValue) {
                    if (oldValue !== newValue && this.document.template) {
                        this.document.template.version = null;
                    }
                });
                $scope.$watch('document.uploadedFile.slug', function (newValue, oldValue) {
                    if (oldValue !== newValue && this.document.uploadedFile) {
                        this.document.uploadedFile.version = null;
                    }
                });
                $scope.$watch('pdfVersions',  (newValue, oldValue) =>{
                    if (this.document.template)
                        this.getPdfVersions(this.document.template, this.documents);
                });

                /* Get file versions upon event load */
                $scope.$watch('fileVersions',  (newValue, oldValue) => {
                    if (this.document.uploadedFile)
                        this.getFileVersions(this.document.uploadedFile, this.files);
                });
                $scope.$watch('document.template.version', function (newValue, oldValue) {
                    if (oldValue !== newValue && this.document.template && this.document.template.version != null)
                    $scope.$emit('templateChanged');
                });

                $scope.delete = function (index) {
                    this.object.attachments.splice(index, 1);
                    this.pdfVersions.splice(index, 1);
                    $scope.$emit('templateChanged');
                };

                $scope.checkDocumentValue = (index) => {
                    if (this.object.attachments[index].type === "URL") {
                        delete this.object.attachments[index].template;
                        delete this.object.attachments[index].uploadedFile;
                    } else if (this.object.attachments[index].type === "TEMPLATE") {
                        delete this.object.attachments[index].url;
                        delete this.object.attachments[index].uploadedFile;
                    } else if (this.object.attachments[index].type === "UPLOADED_FILE") {
                        delete this.object.attachments[index].template;
                        delete this.object.attachments[index].url;
                    }
                };
            }

            this.delete =  (index) => {
                this.object.attachments.splice(index, 1);
                this.pdfVersions.splice(index, 1);
                $scope.$emit('templateChanged');
            };

            this.getPdfVersions = (selectedDocument, existingDocuments)  => {
                console.log('existingDocuments', existingDocuments)
                console.log('selected doc', selectedDocument)

                if (existingDocuments) {
                    existingDocuments.forEach((document) => {
                        if (selectedDocument.slug == document.slug) {
                            this.pdfVersions = document.versions;
                        }
                    });
                }
            };

            // /* extract and populate file version select */
            this.getFileVersions = (selectedTemplate, files) => {
                if (files) {
                    files.forEach((file) => {
                        if (selectedTemplate.slug === file.slug) {
                            this.fileVersions = file.versions;
                        }
                    });
                }
            }

        },
        controllerAs: "documentsCtrl"
    });