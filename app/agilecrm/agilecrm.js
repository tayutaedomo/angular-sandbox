(function(){

  angular.module('myApp.agilecrm', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/agilecrm', {
        templateUrl: 'agilecrm/agilecrm.html',
        controller: 'AgilecrmCtrl as agilecrmCtrl'
      });
    }])

    .controller('AgilecrmCtrl', ['$window', function($window) {
      var that = this;
      this.email = null;

      this.doSetEmail = function() {
        if ($window._agile) {
          $window._agile.set_email(that.email);
        } else {
          console.log('doSetEmail _agile is empty.');
        }
      }

      this.doSetEmailAndPageView = function() {
        if ($window._agile) {
          $window._agile.set_email(that.email);
          $window._agile.track_page_view();
        } else {
          console.log('doSetEmailWithPageView _agile is empty.');
        }
      }
    }]);

})();

