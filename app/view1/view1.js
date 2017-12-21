(function(){

  angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
      });
    }])

    .controller('View1Ctrl', ['GoogleAnalyticsService', function(GoogleAnalyticsService) {
      GoogleAnalyticsService.setPage('view1', 'app');
      GoogleAnalyticsService.sendEvent('Category 1', 'Action 1', 'Label 1', true);
    }]);

})();

