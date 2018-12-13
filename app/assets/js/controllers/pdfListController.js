angular
    .module('app')
    .controller(
        'pdfListController', [
            '$scope',
            '$state',
            '$localStorage',
            'DataService',
            'tenantService',

            function(
                $scope,
                $state,
                $localStorage,
                DataService,
				tenantService
            ) {

                let endpoint = '/documents/templates',
                    tenant = tenantService.getTenant(),
                    language = tenantService.getLanguage(tenant),
                    acceptHeader = 'application/x.com.media-saturn.rea.pdf-template-list+json';

                /* get templates */
                DataService.getData(endpoint, 0, {
                        'X-Tenant': tenant,
                        'Accept-Language': language
                    })
                    .then(
                        response => $scope.pdfTemplates = response.data
                    );

                /* Reload list on distribution channel change */
                $scope.$on(
                    'tenantChanged', () => $state.reload()
                );
                /* Reload list on language change */
                $scope.$on(
                    'languageChanged', () => $state.reload()
                );

                /**
                 * open selected template either in edit mode or in preview mode
                 * @param  {Object} template template to open
                 * @param  {Object} state    object containing all state properties such as status, from, to..
                 * @return {void}
                 */
                $scope.openPdfTemplate = (template, state) => {
                    var toState = (state === 'edit') ? 'appAside.templates-edit' : 'app.show',
                        draft = (template.status === 'UNPUBLISHED' || template.hasDraft) ? true : false;
                    $localStorage.draft = draft;
                    $state.go(toState, {
                        type: 'documents',
                        slug: template.slug,
                        draft: draft
                    });
                };
            }
        ]);
