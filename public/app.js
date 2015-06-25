angular.module('rest-browser', ['ui.bootstrap']);

angular.module('rest-browser').controller('endpointsController', function($scope, $window, $http) {
  $scope.endpoints = [];

  $scope.tabs = [{
    title: 'Dynamic Title 1',
    content: 'Dynamic content 1'
  }, {
    title: 'Dynamic Title 2',
    content: 'Dynamic content 2',
    disabled: true
  }];

  $http.get('/api').
  success(function(data, status, headers, config) {
    data.links.forEach(function(link) {
      $scope.endpoints.push(link);
    })
  }).
  error(function(data, status, headers, config) {

  });

  console.log(window.location.hash);

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});
