angular.module('groomtools')
	.config(['$routeProvider', function($routeProvider){


		$routeProvider
			.when('/', {
				templateUrl : '/html/home.html',
				controller : 'homeController'
			})
			.when('/blog', {
				templateUrl : '/html/blog.html',
				controller : 'blogController'
			})
			.when('/admin', {
				templateUrl : '/html/admin.html',
				controller : 'adminController'
			})
	}])