angular
    .module('app')
    .controller(
        'templatesListController', [
            '$scope',
            '$state',
            '$localStorage',
            'DataService',
            'AuthorizationService',

            function(
                $scope,
                $state,
                $localStorage,
                DataService,
                AuthorizationService,
            ) {

                /* default variables */
                let endpoint = '/notifications/templates',
                    tenant = AuthorizationService.getTenant(),
                    acceptHeader = 'application/x.com.media-saturn.rea.email-template-list+json';

                /* get templates */
                DataService.getData(
                        endpoint,
                        0, {
                            'X-Tenant':tenant,
                            'Accept': acceptHeader
                        })
                    .then(
                        response => $scope.templates = response.data
                    );

                /* Reload list on distribution channel change */
                $scope.$on('tenantChanged', () => $state.reload());

                /**
                 * open selected template either in edit mode or in preview mode
                 * @param  {Object} template template to open
                 * @param  {Object} state    object containing all state properties such as status, from, to..
                 * @return {void}
                 */
                $scope.openTemplate = (template, state) => {
                    var toState = (state === 'edit') ? 'appAside.templates-edit' : 'app.show',
                        draft = (template.status === 'UNPUBLISHED' || template.hasDraft) ? true : false;
                    $localStorage.draft = draft;
                    $state.go(toState, {
                        type: 'notifications',
                        slug: template.slug,
                        draft: draft
                    });
                };

            }
        ]);