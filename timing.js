angular.module('timing', [])
.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        $timeout(function() {
          element.parent().find('input')[0].focus();
        });
      });
    }
  };
})
.controller('MainCtrl', [
  '$scope','$http','$window',
  function($scope,$http,$window){
    $scope.temps = {};
 
    $scope.getTemps = function() {
      var pURL = 'http://localhost:8080/sky/cloud/A1wAHHaJ6YdUktuBQ97PJ6/temperature_store/temperatures';
      return $http.post(pURL).success(function(data){
        $scope.getAll();
      });
    };
 
    var iURL = '/sky/event/'+$scope.eci+'/eid/timing/finished';
    $scope.finished = function(number) {
      var pURL = iURL + "?number=" + number;
      return $http.post(pURL).success(function(data){
        $scope.getAll();
      });
    };
 
    var gURL = 'http://localhost:8080/sky/cloud/A1wAHHaJ6YdUktuBQ97PJ6/temperature_store/temperatures';
    $scope.getAll = function() {
      return $http.get(gURL).success(function(data){
        console.log(data);
        $scope.temps = data;
      });
    };
 
    $scope.getAll();
 
  }
]);
