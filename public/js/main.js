angular.module('homeMod', [])

angular.module('homeMod')
	.controller('homeController', ['$scope', function($scope) {
		console.log('running')
		$scope.greeting = "hello"
	}])

