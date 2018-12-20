
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
            .state('event', {
                url: '/event?source&actions&mapping',
                templateUrl: 'app/views/event/event.controller.html',
                controller: 'eventController as eventController'
            });
            $urlRouterProvider.otherwise('/');
    });