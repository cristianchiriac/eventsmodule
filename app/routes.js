
eventsModule
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home/home.controller.html',
                controller: 'homeController as ctrl'
            })
            .state('eventslist', {
                url: '/events',
                templateUrl: 'app/views/eventslist/eventslist.controller.html',
                controller: 'eventslistController as ctrl'
            })

            .state('definition', {
                url: '/definition',
                templateUrl: 'app/views/definition/definition.controller.html',
                controller: 'definitionController as ctrl'
            })
            // .state('actions', {
            //     url: '/actions',
            //     templateUrl: 'app/views/actions/actions.controller.html',
            //     controller: 'actionsController as ctrlAction'
            // })
            .state('data-mapping', {
                url: '/data-mapping',
                templateUrl: 'app/views/data-mapping/dataMapping.controller.html',
                controller: 'dataMappingController as ctrlDataMapping'
            })

            .state('event', {
                url: '/event?source&actions&mapping',
                templateUrl: 'app/views/event/event.controller.html',
                controller: 'eventController as eventController'
            });
            $urlRouterProvider.otherwise('/');
    });