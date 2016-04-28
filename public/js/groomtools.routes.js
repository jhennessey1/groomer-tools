angular.module('groomtools')
	.config(['$routeProvider', function($routeProvider){


		$routeProvider
			.when('/', {
				templateUrl : '/html/home.html',
				controller : 'homeController'
			})
	}])