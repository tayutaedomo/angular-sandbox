(function(){

  angular.module('myApp.form', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/form', {
        templateUrl: 'form/form.html',
        controller: 'FormCtrl as formCtrl'
      });
    }])

    .controller('FormCtrl', [function() {
      this.true_value = 'OK';
      this.false_value = 'NG';
      this.checkbox = this.true_value;
      //this.checked = true;

      this.on_checkbox_click = function() {
        console.log('on_checkbox_click, Checkbox value is ', this.checkbox);
      };

      this.on_checkbox_change = function() {
        console.log('on_checkbox_change, Checkbox value is ', this.checkbox);
      };
    }]);

})();

