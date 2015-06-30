angular.module('rest-browser', ['ui.bootstrap']);

angular.module('rest-browser').controller('endpointsController', function($scope, $window, $http, $timeout) {
  $scope.endpoints = [];
  $scope.responses = [];
  $scope.simpleEndpointsLising = [];
  $scope.webAuthToken = '';
  $scope.selectedEndpoint = "";

  $http.post('/api/auth', {
    username: 'kyle',
    password: 'd7b47bfa1e25cd2de6142522d486b2fb4c818598c090ccd4ef5c6ba415aa7846ca4da04decbdbf04'
  }).
  success(function(data, status, headers, config) {
    console.log(data);
    $scope.webAuthToken = data.token;
    $http.get('/api?token=' + $scope.webAuthToken).
    success(function(data, status, headers, config) {
      console.log(data.endpoints);
      data.endpoints.forEach(function(endpoint) {
        $scope.endpoints[endpoint] = {
          url: endpoint,
          data: []
        };
        $scope.simpleEndpointsLising.push(endpoint);
        console.log($scope.selectedEndpoint);
      })
      $scope.selectedEndpoint = $scope.endpoints[data.endpoints[0]].url;
      $scope.getListing($scope.selectedEndpoint);
    });
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
    $http.get(endpoint+'/columns').
    success(function(data, status, headers, config) {
      $scope.endpoints[endpoint].columns = [];
      data.forEach(function(data) {
          $scope.endpoints[endpoint].columns.push(data);
        })
        // console.log($scope.endpoints[endpoint]);
    });
  }

  $scope.postListing = function(endpoint) {
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
