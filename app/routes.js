
eventsModule
    .config(function ($stateProvider, $urlRouterProvider, $breadcrumbProvider) {
        console.log($breadcrumbProvider)
        $breadcrumbProvider.setOptions({
            // prefixStateName: 'home',
            includeAbstract: true,
            template: '<li class="breadcrumb-item" ng-repeat="step in steps" ><a href="{{step.ncyBreadcrumbLink}}">{{step}}</a></li>'
        });


        
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home/home.controller.html',
                controller: 'homeController as ctrl',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('eventslist', {
                url: '/events',
                templateUrl: 'app/views/eventslist/eventslist.controller.html',
                controller: 'eventslistController as ctrl',
                ncyBreadcrumb: {
                    label: 'Events',
                    parent: 'home'
                }
            })

            .state('event', {
                url: '/event?source&actions&mapping',
                templateUrl: 'app/views/event/event.controller.html',
                controller: 'eventController as eventController',
                ncyBreadcrumb: {
                    label: '',
                    parent: 'eventslist'
                }
            });
            $urlRouterProvider.otherwise('/');
    });