var app = angular.module('rest-browser', ['ui.bootstrap', 'ngAnimate']);

app.controller('endpointsController', function($scope, $window, $http, $timeout) {
  $scope.endpoints = [];
  $scope.responses = [];
  $scope.simpleEndpointsLising = [];
  $scope.webAuthToken = '';
  $scope.selectedEndpoint = "";
  $scope.progress = 10;
  $scope.new = {};

  $scope.chartLabels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.chartSeries = ['Series A', 'Series B'];
  $scope.chartData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

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
    });
  });

  $scope.getListing = function(endpoint) {
    $scope.new = {};
    $scope.progress = 0;
    $scope.currentPage = 0;
    $http.get(endpoint + '/columns').
    success(function(data, status, headers, config) {
      $scope.progress += 20;
      $scope.endpoints[endpoint].columns = [];
      data.forEach(function(data) {
          $scope.new[data] = "";
          $scope.endpoints[endpoint].columns.push(data);
        })
        // console.log($scope.endpoints[endpoint]);
    });
    $http.get(endpoint).
    success(function(data, status, headers, config) {
      $scope.endpoints[endpoint].data = [];
      data.forEach(function(data) {
          $scope.progress += 70 / data.length;
          $scope.endpoints[endpoint].data.push(data);
        })
        // console.log($scope.endpoints[endpoint]);
    });
    $scope.progress = 100;
  }

  $scope.postListing = function() {
    console.log($scope.new);
    $http.post($scope.selectedEndpoint, $scope.new).
    success(function(data, status, headers, config) {
      // console.log("posted! " + data);
      $scope.getListing($scope.selectedEndpoint);
    });
  }

  $scope.putListing = function(row) {
    console.log($scope.selectedEndpoint + "/" + row.id);
    $http.put($scope.selectedEndpoint + "/" + row.id, row).
    success(function(data, status, headers, config) {
      // console.log("posted! " + data);
      $scope.getListing($scope.selectedEndpoint);
    });
  }

  $scope.itemsPerPage = 10;
  $scope.currentPage = 0;

  // $scope.items = [];
  //
  // for (var i = 0; i < 50; i++) {
  //   $scope.items.push({
  //     id: i,
  //     name: "name " + i,
  //     description: "description " + i
  //   });
  // }

  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }
    return ret;
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    if($scope.endpoints[$scope.selectedEndpoint])  {
      return Math.ceil($scope.endpoints[$scope.selectedEndpoint].data.length / $scope.itemsPerPage) - 1;
    } else {
      return 0;
    }
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

});

/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});

app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    if(input) return input.slice(start);
  };
});
