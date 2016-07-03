'use strict';

(function(){

  function RouteConfig($routeProvider) {
    $routeProvider.when('/directive', {
      templateUrl: 'directive/directive.html',
      controller: 'DirectiveController'
    });
  }
  RouteConfig.$inject = ['$routeProvider'];

  function DirectiveController() {
  }
  DirectiveController.$inject = [];

  // Refer: http://angularjsninja.com/blog/2013/11/20/angularjs-custom-directives/
  function NinjaCustomerDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directive/partials/ninja-customer.html'
    };
  }

  angular.module('myApp.directive', ['ngRoute'])
    .config(RouteConfig)
    .directive('ninjaCustomer', NinjaCustomerDirective)
    .controller('DirectiveController', DirectiveController);

})();

