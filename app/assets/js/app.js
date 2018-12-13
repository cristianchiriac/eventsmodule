// Default colors
var brandPrimary = '#20a8d8';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';
const ENDPOINTS = {
	JMS: '/jms/events',
	'FILES': '/documents/uploaded-files'
};

angular
	.module('app', [
		'ui.router',
		'ui.bootstrap',
		'oc.lazyLoad',
		'ncy-angular-breadcrumb',
		'angular-loading-bar',
		'ngStorage',
		'ngScrollbars',
		'angularUtils.directives.dirPagination',
		'diff-match-patch',
		'dndLists',
		'angular-jwt',
		'ngFileUpload'
	])
	.config(['cfpLoadingBarProvider', '$httpProvider', function (cfpLoadingBarProvider, $httpProvider) {
		cfpLoadingBarProvider.includeSpinner = true;
		cfpLoadingBarProvider.latencyThreshold = 1;
		$httpProvider.interceptors.push('HTTPResponseInterceptor');
	}])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		'$transitions',
		'AuthorizationService',
		'AlertService',
		'$uibModalStack',

		function (
			$rootScope,
			$state,
			$stateParams,
			$transitions,
			AuthorizationService,
			AlertService,
			$uibModalStack
		) {

			/*
				hide TransitionRejection errors
				bug in ui-router
			 */
			$state.defaultErrorHandler(error => angular.noop(error));

			/*
				handle special cases
			 */
			$transitions.onBefore({}, transition => {
				var toState = transition.to();
				$rootScope.navbarStatus = {};
				/*
					handle protected states
				*/
				if (toState.name !== 'app.search' && toState.authorization) {
					AuthorizationService.authorize(toState)
						.catch((state) => {
							$state.go(state)
						});
				}
				/*
					add special body classes for specific styling
				*/
				if (toState.name === 'app.search') {
					$rootScope.bodyClass = 'sterling';
				} else if (toState.name === 'appSimple.auth' || toState.name === 'appSimple.dashboard' || toState.name === 'appSimple.signup') {
					$rootScope.bodyClass = 'newds';
				} else {
					$rootScope.bodyClass = 'rea';
				}
				/*
					disable language select for list states
				*/
				if (toState.name === 'app.templates-list' || toState.name === 'appAside.templates-edit' || toState.name === 'appAside.templates-new' || toState.name === 'app.events' || toState.name === 'app.newEvent' || toState.name === 'app.resend' || toState.name === 'app.event') {
					$rootScope.navbarStatus.languagesDisabled = true;
				} else {
					$rootScope.navbarStatus.languagesDisabled = false;
				}
				/*
					disable tenant select for edit states
				*/
				if (toState.name === 'app.event' || toState.name === 'app.newEvent' || toState.name === 'appAside.templates-edit' || toState.name === 'appAside.templates-new') {
					$rootScope.navbarStatus.tenantDisabled = true;
				} else {
					$rootScope.navbarStatus.tenantDisabled = false;
				}
				/*
					dismiss all modals
				 */
				$uibModalStack.dismissAll();
			});

			$rootScope.editing = false;
			$rootScope.alerts = AlertService.get();
			$rootScope.vm = {};

			$rootScope.$state = $state;
			return $rootScope.$stateParams = $stateParams;
		}
	]);