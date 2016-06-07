angular.module('groomtools')
	.controller('homeController', ['$scope', function($scope){
		
		$scope.login = function(user) {
			$http.post('/login', user)
				.then(function(returnData){
					if(returnData.data.error === 'something went wrong')
				})
		}
		
	}])