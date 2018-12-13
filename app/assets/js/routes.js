angular
	.module('app')
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$ocLazyLoadProvider',
		'$breadcrumbProvider',
		'$locationProvider',

		function (
			$stateProvider,
			$urlRouterProvider,
			$ocLazyLoadProvider,
			$breadcrumbProvider,
			$locationProvider
		) {

			$locationProvider.hashPrefix('');
			$urlRouterProvider.otherwise('/dashboard');

			$ocLazyLoadProvider.config({
				// Set to true if you want to see what and when is dynamically loaded
				debug: false
			});

			$breadcrumbProvider.setOptions({
				prefixStateName: 'app.main',
				includeAbstract: true,
				template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
			});

			$stateProvider
				.state('app', {
					abstract: true,
					templateUrl: 'views/common/layouts/full.html',
					ncyBreadcrumb: {
						label: 'Root',
						skip: true
					}
				})
				.state('appAside', {
					abstract: true,
					templateUrl: 'views/common/layouts/aside.html'
				})
				.state('app.main', {
					url: '/home',
					ncyBreadcrumb: {
						label: 'Home',
					}
				})
				.state('appSimple', {
					abstract: true,
					templateUrl: 'views/common/layouts/simple.html'
				})

				// Additional Pages
				.state('appSimple.auth', {
					url: '/auth',
					authorization: false,
					templateUrl: 'views/pages/login.html'
				})
				.state('appSimple.dashboard', {
					url: '/dashboard',
					templateUrl: 'views/pages/dashboard.html',
					authorization: true,
					permissions: []
				})
                .state('appSimple.signup', {
                    url: '/signup',
					authorization: true,
                    templateUrl: 'views/pages/signup.html'
                })
				.state('appSimple.register', {
					url: '/register',
					templateUrl: 'views/pages/register.html'
				})
				.state('appSimple.404', {
					url: '/404',
					templateUrl: 'views/pages/404.html',
					authorization: false
				})
				.state('appSimple.500', {
					url: '/500',
					templateUrl: 'views/pages/500.html'
				})
				.state('app.unauthorized', {
					url: '/unauthorized',
					templateUrl: 'views/unauthorized.html',
					authorization: false,
					ncyBreadcrumb: {
						label: 'Unauthorized'
					}
				})
				.state('app.events', {
					url: '/events',
					templateUrl: 'views/event/list.html',
					authorization: true,
					permissions: ["event-read"],
					controller: 'eventController',
					ncyBreadcrumb: {
						label: 'Events'
					}
				})
				.state('app.event', {
					url: '/event/{slug}',
					templateUrl: 'views/event/edit.html',
					authorization: true,
					permissions: ["event-read"],
					controller: 'eventController'
				})
				.state('app.newEvent', {
					url: '/events/new',
					templateUrl: 'views/event/new.html',
					authorization: true,
					permissions: ["event-write"],
					controller: 'eventController'
				})
				/* list/create/edit for grapesjs */
				.state('app.templates-list', {
					url: '/templates',
					templateUrl: 'views/template/templates-list.html',
					controller: 'templatesListController',
					ncyBreadcrumb: {
						label: 'Email Templates'
					},
					authorization: true,
					permissions: ["template-read"]
				})
				.state('appAside.templates-edit', {
					url: '/{type}/{slug}/edit',
					templateUrl: 'views/template/templates-edit.html',
					controller: 'templatesEditController',
					ncyBreadcrumb: {
						label: 'Templates edit'
					},
					authorization: true,
					permissions: ["template-read", "template-write"]
				})
				.state('appAside.templates-new', {
					url: '/{type}/new',
					templateUrl: 'views/template/templates-new.html',
					controller: 'templatesNewController',
					ncyBreadcrumb: {
						label: 'New template'
					},
					authorization: true,
					permissions: ["template-write"]
				})
				.state('app.show', {
					url: '/{type}/{slug}/show',
					templateUrl: 'views/template/show.html',
					controller: 'showController',
					ncyBreadcrumb: {
						label: '{{templateName}}'
					},
					authorization: true,
					permissions: ["template-read"]
				})
				.state('app.search', {
					url: '/search?orderNumber&distributionChannel&isMigrated&channel',
					templateUrl: 'views/search/search.html',
					controller: 'searchController',
					ncyBreadcrumb: {
						label: 'Email Search'
					},
					authorization: true,
					permissions: ["template-read"]
				})
				.state('app.resend', {
					url: '/resend',
					templateUrl: 'views/resend/list.html',
					controller: 'resendController',
					ncyBreadcrumb: {
						label: 'Email Configuration'
					},
					authorization: true,
					permissions: ["template-read"]
				})
				.state('app.pdf-configuration', {
					url: '/pdf-configuration',
					templateUrl: 'views/resend/pdfList.html',
					controller: 'pdfConfigurationController',
					ncyBreadcrumb: {
						label: 'PDF Configuration'
					},
					authorization: true,
					permissions: ["template-read"]
				})
				.state('app.pdf-list', {
					url: '/pdf',
					templateUrl: 'views/pdf/list.html',
					controller: 'pdfListController',
					ncyBreadcrumb: {
						label: 'PDF Templates'
					},
					authorization: true,
					permissions: ["template-read"]
				})
				.state('app.files', {
					url: '/files',
					templateUrl: 'views/uploaded-files/list.html',
					controller: 'fileListController',
					controllerAs: 'fileList',
					ncyBreadcrumb: {
						label: 'Uploaded files'
					},
					authorization: true,
					permissions: ["file-read"]
				});
		}
	]);
