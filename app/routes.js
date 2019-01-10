
eventsModule
    .config(function ($stateProvider, $urlRouterProvider, $breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            includeAbstract: true,
            template: '<li class="breadcrumb-item" ng-repeat="step in steps" ><a ng-if="step.ncyBreadcrumb.label" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-if="!step.ncyBreadcrumb.label">{{step.ncyBreadcrumbLabel}}</span></li>'
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
            .state('events', {
                url: '/events',
                templateUrl: 'app/views/events/events.controller.html',
                controller: 'eventsController as eventsController',
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
                    parent: 'events'
                }
            });
            $urlRouterProvider.otherwise('/');
    });