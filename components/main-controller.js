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
