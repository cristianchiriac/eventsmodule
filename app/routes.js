
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

            .state('update', {
                url: '/update',
                templateUrl: 'app/views/update/update.controller.html',
                controller: 'updateController'
            })
    });