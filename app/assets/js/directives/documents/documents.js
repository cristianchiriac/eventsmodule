angular
	.module('app')
	.directive('documents', function () {
		return {
			templateUrl: 'assets/js/directives/documents/documents.html',
			scope: false,
			link: function (scope, element, attributes) {
				scope.object = scope.$eval(attributes.object);
				scope.document = scope.$eval(attributes.document);
				scope.objectIndex = attributes.objectIndex;
				scope.documentSources = [{
					name: 'File',
					value: 'UPLOADED_FILE'
				}, {
					name: 'URL',
					value: 'URL'
				}, {
					name: 'Template',
					value: 'TEMPLATE'
				}];
				scope.fileVersions = {};

				/* Reset selected template version on file change */
				scope.$watch('document.template.slug', function (newValue, oldValue) {
					if (oldValue !== newValue && scope.document.template) {
						console.log("resettt");
						scope.document.template.version = null;
					}
				});
				/* Reset selected file version on file change */
				scope.$watch('document.uploadedFile.slug', function (newValue, oldValue) {
					if (oldValue !== newValue && scope.document.uploadedFile) {
						console.log("reset");
						scope.document.uploadedFile.version = null;
					}
				});
				/* Get template versions upon event load */
				scope.$watch('pdfVersions', function (newValue, oldValue) {
					if (scope.document.template)
						scope.getPdfVersions(scope.document.template, scope.$index);
				});
				/* Get file versions upon event load */
				scope.$watch('fileVersions', function (newValue, oldValue) {
					if (scope.document.uploadedFile)
						scope.getFileVersions(scope.document.uploadedFile, scope.$index);
				});
				scope.$watch('document.template.version', function (newValue, oldValue) {
					if (oldValue !== newValue && scope.document.template && scope.document.template.version != null)
						scope.$emit('templateChanged');
				});

				scope.delete = function (index) {
					scope.object.attachments.splice(index, 1);
					scope.pdfVersions.splice(index, 1);
					scope.$emit('templateChanged');
				};
				scope.checkDocumentValue = (index) => {
					if (scope.object.attachments[index].type === "URL") {
						delete scope.object.attachments[index].template;
					} else if (scope.object.attachments[index].type === "TEMPLATE") {
						delete scope.object.attachments[index].url;
					}
				};
				scope.getPdfVersions = (selectedTemplate, index) => {
					if (scope.documents) {
						scope.documents.forEach((document) => {
							if (selectedTemplate.slug === document.slug){
								scope.pdfVersions[index] = document.versions;
							}
						});
					}
				};
				/* extract and populate file version select */
				scope.getFileVersions = (selectedTemplate, index) => {
					if (scope.files) {
						scope.files.forEach((file) => {
							if (selectedTemplate.slug === file.slug){
								scope.fileVersions[index] = file.versions;
							}
						});
					}
				}
			}
		};
	});