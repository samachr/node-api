var app = angular.module('rest-browser', ['ui.bootstrap']);

app.controller('endpointsController', function($scope, $window, $http, $timeout) {
  $scope.endpoints = [];
  $scope.responses = [];
  $scope.simpleEndpointsLising = [];
  $scope.webAuthToken = '';
  $scope.selectedEndpoint = "";
  $scope.progress = 10;
  $scope.new = {};

  $http.post('/api/auth', {
    username: 'kyle',
    password: 'd7b47bfa1e25cd2de6142522d486b2fb4c818598c090ccd4ef5c6ba415aa7846ca4da04decbdbf04'
  }).
  success(function(data, status, headers, config) {
    $scope.progress += 20;
    //console.log(data);
    $scope.webAuthToken = data.token;
    $http.get('/api?token=' + $scope.webAuthToken).
    success(function(data, status, headers, config) {
      $scope.progress += 50;
      //console.log(data.endpoints);
      data.endpoints.forEach(function(endpoint) {
        $scope.endpoints[endpoint] = {
          url: endpoint,
          data: []
        };
        $scope.simpleEndpointsLising.push(endpoint);
        //console.log($scope.selectedEndpoint);
      })
      $scope.selectedEndpoint = $scope.endpoints[data.endpoints[0]].url;
      $scope.getListing($scope.selectedEndpoint);
      $scope.progress = 100;
    });
  });

  $scope.getListing = function(endpoint) {
    $scope.new = {};
    $scope.progress = 0;
    $http.get(endpoint).
    success(function(data, status, headers, config) {
      $scope.endpoints[endpoint].data = [];
      data.forEach(function(data) {
          $scope.progress += 90/data.length;
          $scope.endpoints[endpoint].data.push(data);
        })
        // console.log($scope.endpoints[endpoint]);
    });
    $http.get(endpoint+'/columns').
    success(function(data, status, headers, config) {
      // $scope.progress += 40;
      $scope.endpoints[endpoint].columns = [];
      data.forEach(function(data) {
          $scope.new[data] = "";
          $scope.endpoints[endpoint].columns.push(data);
        })
        // console.log($scope.endpoints[endpoint]);
    });
    // $scope.progress = 100;
  }

  $scope.postListing = function() {
    console.log($scope.new);
    $http.post($scope.selectedEndpoint, $scope.new).
    success(function(data, status, headers, config) {
      console.log("posted! " + data);
      $scope.getListing($scope.selectedEndpoint);
    });
  }

  $scope.putListing = function(row) {
    console.log($scope.selectedEndpoint + "/" + row.id);
    $http.put($scope.selectedEndpoint + "/" + row.id, row).
    success(function(data, status, headers, config) {
      console.log("posted! " + data);
      $scope.getListing($scope.selectedEndpoint);
    });
  }

});

/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
