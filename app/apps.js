var abbajs = angular.module('abbajs',['ngRoute','ngAnimate']);
abbajs.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'abbaController'
      })
      .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'abbaController'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactController'
      })
      .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'contactController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);

  abbajs.directive('randomNinjas' , 'fileModele', [function(){

     return{
             restrict:'E',
             $scope: {
             ninjas:'=',
             title:'='

            },
    templateUrl:'views/random.html',
    transclude:true,
    replace:true,
    controller:function ($scope){
     $scope.random=Math.floor(Math.random()*7);

    },
  };

  }]);
  
  abbajs.controller('abbaController', ['$scope','$http', function($scope,$http){
    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    } 

    $scope.addNinja = function(){

        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available:true
        } );
        $scope.newninja.name=""
        $scope.newninja.belt=""
        $scope.newninja.rate=""

    };

    $scope.removeAll=function() {
      $scope.ninjas=[];
      
    }

    $http.get('data/ninjas.json').then(function(data){
      $scope.ninjas = data.data;
    });


                  
}]);

abbajs.controller('contactController', ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
  $location.path('/contact-success');

  };
            
}]);
