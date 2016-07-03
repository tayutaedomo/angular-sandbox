'use strict';

(function(){

  function RouteConfig($routeProvider) {
    $routeProvider.when('/directive', {
      templateUrl: 'directive/directive.html',
      controller: 'DirectiveController'
    });
  }
  RouteConfig.$inject = ['$routeProvider'];


  // Refer: http://angularjsninja.com/blog/2013/11/20/angularjs-custom-directives/
  function NinjaCustomerDirective() {
    return {
      restrict: 'E',
      templateUrl: 'directive/partials/ninja-customer.html'
    };
  }


  // Refer: http://qiita.com/laco0416/items/edfa917583af4593ad6c#%E5%8C%96%E7%9F%B3---directive--link
  function MyApp1Directive() {
    return {
      restrict: "E",
      template: "<my-app1-greeting name=\"World\"></my-app1-greeting>"
    };
  }
  function MyApp1GreetingDirective() {
    return {
      restrict: "E",
      template: "<h1>MyApp1 Hello {{ upperName() }}!</h1>",
      link: function(scope, element, attrs) {
        scope.name = attrs.name;
        scope.upperName = function() {
          return scope.name.toUpperCase();
        };
      }
    };
  }

  // Refer: http://qiita.com/laco0416/items/edfa917583af4593ad6c#%E6%99%82%E4%BB%A3%E9%81%85%E3%82%8C---directive--scope--controller
  function MyApp2Ctrl() {
  }
  function MyApp2Directive() {
    return {
      restrict: "E",
      scope: {},
      template: "<my-app2-greeting name=\"'World'\"></my-app2-greeting>",
      controller: MyApp2Ctrl // Changed!!
    };
  }
  function MyApp2GreetingCtrl($scope) {
    $scope.upperName = function() {
      return $scope.name.toUpperCase();
    };
  }
  function MyApp2GreetingDirective() {
    return {
      restrict: "E",
      scope: {
        name: "="
      },
      template: "<h1>MyApp2 Hello {{upperName()}}!</h1>",
      controller: MyApp2GreetingCtrl // Changed!!
    };
  }

  // Refer: http://qiita.com/laco0416/items/edfa917583af4593ad6c#%E5%8F%A4%E3%81%84---directive--scope--controlleras
  function MyApp3Ctrl() {
  }

  function MyApp3Directive() {
    return {
      restrict: "E",
      scope: {},
      template: "<my-app3-greeting name=\"'World'\"></my-app3-greeting>",
      controller: MyApp3Ctrl
    };
  }
  function MyApp3GreetingCtrl($scope) {
    this.upperName = function() { // Changed!!
      return $scope.name.toUpperCase();
    };
  }
  function MyApp3GreetingDirective() {
    return {
      restrict: "E",
      scope: {
        name: "="
      },
      template: "<h1>MyApp3 Hello {{$ctrl.upperName()}}!</h1>", // Changed!!
      controller: MyApp3GreetingCtrl,
      controllerAs: "$ctrl" // Changed!!
    };
  }

  // Refer: http://qiita.com/laco0416/items/edfa917583af4593ad6c#%E3%83%8A%E3%82%A6%E3%81%84angularjs---directive--scope--controlleras
  function MyApp4Ctrl() {
  }
  function MyApp4Directive() {
    return {
      restrict: "E",
      scope: {},
      template: "<my-app4-greeting name=\"'World'\"></my-app4-greeting>",
      controller: MyApp4Ctrl
    };
  }
  function MyApp4GreetingCtrl() {
    this.upperName = function() {
      return this.name.toUpperCase(); // Changed!!
    }
  }
  function MyApp4GreetingDirective() {
    return {
      restrict: "E",
      scope: {
        name: "="
      },
      bindToController: true, // Changed!!
      template: "<h1>MyApp4 Hello {{$ctrl.upperName()}}!</h1>",
      controller: MyApp4GreetingCtrl,
      controllerAs: "$ctrl"
    };
  }

  // Refer: http://qiita.com/laco0416/items/edfa917583af4593ad6c#%E3%83%A2%E3%83%80%E3%83%B3%E3%81%AAangularjs---directive--scope--btc--controlleras
  function MyApp5Ctrl() {
  }
  function MyApp5Directive() {
    return {
      restrict: "E",
      scope: {},
      template: `<my-app5-greeting name="'World'"></my-app5-greeting>`,
      controller: MyApp5Ctrl
    };
  }
  function MyApp5GreetingCtrl() {
    this.upperName = () => this.name.toUpperCase(); // Changed!!
  }
  function MyApp5GreetingDirective() {
    return {
      restrict: "E",
      scope: {},
      bindToController: { // Changed!!
        name: "="
      },
      template: `<h1>MyApp5 Hello {{$ctrl.upperName()}}!</h1>`,
      controller: MyApp5GreetingCtrl,
      controllerAs: "$ctrl"
    };
  }


  function DirectiveController() {
  }
  DirectiveController.$inject = [];


  angular.module('myApp.directive', ['ngRoute'])
    .config(RouteConfig)
    .directive('ninjaCustomer', NinjaCustomerDirective)
    .directive('myApp1', MyApp1Directive)
    .directive('myApp1Greeting', MyApp1GreetingDirective)
    .directive('myApp2', MyApp2Directive)
    .directive('myApp2Greeting', MyApp2GreetingDirective)
    .directive('myApp3', MyApp3Directive)
    .directive('myApp3Greeting', MyApp3GreetingDirective)
    .directive('myApp4', MyApp4Directive)
    .directive('myApp4Greeting', MyApp4GreetingDirective)
    .directive('myApp5', MyApp5Directive)
    .directive('myApp5Greeting', MyApp5GreetingDirective)
    .controller('DirectiveController', DirectiveController);

})();

