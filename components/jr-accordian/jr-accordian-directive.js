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