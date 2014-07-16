var app = angular.module('myApp', ['ui.router', 'jrModules']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url:'/',
      templateUrl:'views/main.html'
    })
    .state('index.one', {
      url:'/one',
      templateUrl:'views/main.one.html'
    })
    .state('index.two', {
      url:'/two',
      templateUrl:'views/main.two.html'
    })
    .state('index.three', {
      url:'/three',
      templateUrl:'/views/main.three.html'
    })
    .state('accordian', {
      url:'/accordian',
      templateUrl:'views/accordian.html'
    })
    .state('other', {
      url:'/other',
      templateUrl:'views/other.html'
    })

});

app.factory('testData', ['$http', function($http) {
  var obj = {content:null};

  return $http.get('assets/js/data.json');

}]);

app.factory('userData', function() {
  var obj = [
    {
      'name':'Jason',
      'email':'email@email.com',
      'phone':'123-123-4567',
      'address':'123 Fake St.',
      'username':'nerdGoblin3000'
    }
  ]

  return obj;
})

var jr = angular.module('jrModules', []);
