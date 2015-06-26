angular.module('rest-browser', ['ui.bootstrap']);

angular.module('rest-browser').controller('endpointsController', function($scope, $window, $http) {
  $scope.endpoints = [];
  $scope.responses = [];
  $scope.simpleEndpointsLising = [];


  $http.get('/api').
  success(function(data, status, headers, config) {
    data.endpoints.forEach(function(endpoint) {
      $scope.endpoints[endpoint] = {url: endpoint, data: []};
      $scope.simpleEndpointsLising.push(endpoint);
    })
      // console.log($scope.endpoints);
  });



  $scope.getListing = function(endpoint) {
    $http.get(endpoint).
    success(function(data, status, headers, config) {
      $scope.endpoints[endpoint].data = [];
      data.forEach(function(data) {
        $scope.endpoints[endpoint].data.push(data);
      })
      // console.log($scope.endpoints[endpoint]);
    });
  }

});
