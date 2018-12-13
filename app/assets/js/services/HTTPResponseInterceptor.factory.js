angular
	.module('app')
	.factory(
		'HTTPResponseInterceptor', [
			'$q',
			'$state',

			(
				$q,
				$state
			) => {
				return {
					responseError: function (rejection) {
						let defer = $q.defer();
						/*
							catch all unauthorized calls that are not on the login path
						*/
						if (rejection.status == 401 && rejection.data.path !== '/login') {
							$state.go('app.unauthorized')
						}
						defer.reject(rejection);
						return defer.promise;
					}
				};
			}])