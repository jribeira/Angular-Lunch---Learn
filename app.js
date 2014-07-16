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

// Angular directives
jr.directive('jrAccordianWrap', function() {
  return {
    controller: function($scope) {
      this.setIndex = function($index) {
        $scope.open_index = $index;
        console.log($index);
      }

      this.getIndex = function() {
        return $scope.open_index;
      }

    },
    link: function(scope,element,attrs) {
      scope.onlyOne = attrs.onlyOne;
    }
  }
});

//restrict


jr.directive('jrAccordian', ['$window', '$timeout', function ($window, $timeout) {
  return {
    require: '^jrAccordianWrap',
    scope:true,
    templateUrl: 'components/jr-accordian/jr-accordian.html',
    link: function(scope,element,attrs,accordianCtrl) {

      var open = false;
      scope.open = function($index) {
        var prev = accordianCtrl.getIndex();
        var closed_height = element.children()[attrs.closed].clientHeight;
        var open_height = element.children()[attrs.open].clientHeight + closed_height;

        scope.open_style = open_height + 'px';
        scope.closed_style = closed_height + 'px';

        if (scope.onlyOne === 'false') {
          if (!open) {
            scope.open_style = open_height + 'px';
          } else {
            scope.open_style = closed_height + 'px';
          }
          open = !open
        } else {
          if (prev == $index) {
            if (open) {
              accordianCtrl.setIndex($index);
              scope.open_style = open_height + 'px';
            } else {
              accordianCtrl.setIndex($index);
              scope.open_style = closed_height + 'px';
            }
            open = !open
          } else {
            accordianCtrl.setIndex($index);
            scope.open_style = open_height + 'px';
          }
        }
      }

      scope.$watch('open_index', function(value) {
        var closed_height = element.children()[attrs.closed].clientHeight;
        var open_height = element.children()[attrs.open].clientHeight + closed_height;
        if (value == attrs.index) {
          scope.open_style = open_height + 'px';
        } else {
          scope.open_style = closed_height + 'px';
        }
        
      })

      var setHeight = function() {
        var closed_height = element.children()[attrs.closed].clientHeight;
        scope.open_style = closed_height + 'px';
      }

      angular.element(document).ready(function () {
        $timeout(function(){
          setHeight();
        },0);
      });
      angular.element($window).bind('resize', function() {
        setHeight();
      });

    }
  }
}]);
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
app.controller('mainController', ['$scope', 'testData', 'userData', function($scope, testData, userData){

	testData.success(function(data) {
		console.log(data);
		$scope.accordianData = data;
	})

	$scope.userData = userData[0];

	$scope.addNew = false;

	$scope.addItem = function() {

		$scope.addNew = true;

		$scope.newItem = {};

	}

	$scope.enterPressed = function() {
		$scope.addNew = false;
		$scope.accordianData.push($scope.newItem);
	}

	$scope.deleteItem = function($index) {
		$scope.accordianData.splice($index,1);
	}

	$scope.checkLength = function() {
		if ($scope.accordianData.length === 0) {
			return false;
		} else {
			return true;
		}
	}

}]);

app.directive('jrAutoFocus', ['$timeout', function($timeout) {
	return {
		transclude: true,
		link: function(scope, element, attrs) {

			var model = attrs.jrAutoFocus;

			scope.$watch(model, function(value){
				if (value === true) {
					$timeout(function() {
						element[0].focus();
					})
				}
			})
			
		}
	}
}])
