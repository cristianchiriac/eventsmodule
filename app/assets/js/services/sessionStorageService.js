angular
	.module('app')
	.service(
		'sessionStorageService',
		[
			'$window',
			(
				$window
			) => {
				return {
					getItem: (key) => JSON.parse($window.sessionStorage.getItem(key)),
					setItem: (key, value) => $window.sessionStorage.setItem(key, JSON.stringify(value))
				};
			}
		]);