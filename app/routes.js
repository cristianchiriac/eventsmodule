
eventsModule
    .config(function ($stateProvider, $locationProvider) {
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
    });