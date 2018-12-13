angular
	.module('app')
	.service(
		'AuthorizationService', [
			'$rootScope',
			'$http',
			'$q',
			'$localStorage',
			'$sessionStorage',
			'sessionStorageService',
			'$state',
			'jwtHelper',

			(
				$rootScope,
				$http,
				$q,
				$localStorage,
				$sessionStorage,
				sessionStorageService,
				$state,
				jwtHelper
			) => {

				return {
					authorize: function (state) {
						let token = this.getToken(),
							defer = $q.defer(),
							sessionExpired;

						if (!token) {
							defer.reject('appSimple.auth');
						}

						if (token) {
							sessionExpired = this.sessionExpired();
							if (sessionExpired) {
								defer.reject('appSimple.auth');
							}
							if (token && !this.userHasPermission(state.permissions)) {
								defer.reject('app.unauthorized');
							}
							if (token && !this.hasRoles()){
                                defer.reject('appSimple.auth');
							}
							this.setHeader({
								header: 'Authorization',
								value: `Bearer ${token}`
							});
							defer.resolve();
						}

						return defer.promise;
					},
					setHeader: function (options) {
						$http.defaults.headers.common[options.header] = options.value;
					},
					login: function (username, password) {
						return $http.post('/api/auth/login', {
							username: username,
							password: password
						})
							.then(response => {
								this.setUserData(response.data);
							}, function (reason) {
								return $q.reject(reason);
							});
					},
					// removes the token and user authorization data
					logout: function () {
						delete $localStorage.token;
						delete $localStorage.user;
						delete $localStorage.tenant;
						delete $localStorage.language;
						delete $sessionStorage.tenant;
						delete $http.defaults.headers.common["X-Tenant"];
					},
					sessionExpired: function () {
						if (!this.isLoggedIn()) return null;
						return jwtHelper.isTokenExpired(this.getToken())
					},
					setUserData: function (user) {
						let tokenData = jwtHelper.decodeToken(user.token),
							userData = {
								firstName: tokenData.firstName,
								lastName: tokenData.lastName,
								user: tokenData.sub,
								roles: tokenData.roles[0],
								token: user.token
							};
						$localStorage.user = userData;
						if (!$localStorage.tenant) {
							$localStorage.tenant = userData.roles.tenants[0];
						}
					},
					// check if a user has view permissions
					checkPermissionForView: function (view) {
						if (!view.authorization) {
							return true;
						}
						return this.userHasPermissionForView(view);
					},
					userHasPermissionForView: function (view) {
						if (!this.isLoggedIn()) {
							return false;
						}
						if (!view.permissions || !view.permissions.length) {
							return true;
						}
						if (this.isLoggedIn && !this.hasRoles()) {
							return true;
						}
						return this.userHasPermission(view.permissions);
					},
					userHasPermission: function (permissions) {
						if (!this.isLoggedIn()) {
							return false;
						}
						return permissions.every(function (permission) {
							return ($localStorage.user.roles.rights.indexOf(permission) >= 0);
						});
					},
					// get user data from localStorage
					currentUser: function () {
						return ($localStorage.user) ? $localStorage.user : null;
					},
					// check if user is logged in
					isLoggedIn: function () {
						return ($localStorage.user) ? true : false;
					},
					getToken: function () {
						return ($localStorage.user) ? $localStorage.user.token : null;
					},
					getTenant: function () {
						let tenant;
						if (sessionStorageService.getItem('ngStorage-tenant')) {
							tenant = sessionStorageService.getItem('ngStorage-tenant');
						} else if ($localStorage.tenant) {
							tenant = $localStorage.tenant;
						} else if ($localStorage.user) {
							tenant = $localStorage.user.roles.tenants[0];
						} else {
							tenant = "";
						}
						return tenant;
					},
                    hasRoles: function () {
						if (!this.isLoggedIn()) {
							return false;
						}
						return ($localStorage.user.roles.tenants.length > 0 && $localStorage.user.roles.rights.length > 0);
                    },
                    /**
					 * TODO: clarify which endpoint will handle this situation
                     * request roles if a user doesn't have any role
                     * For the moment this endpoint doesn't exist
                     * @param  String username
                     * @param  String country
                     * @return role
                     */
                    signUp: function(username, country, role) {
                        // return $http.post('/api/notifications/sign-up', {
                        //     username: username,
                        //     country: country,
                        //     role: role
                        // })
                        //     .then(function(response) {
                        //         return response;
                        //     });
                    },
				};
			}
		]);
