(function(){

  angular.module('myApp.agilecrm', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/agilecrm', {
        templateUrl: 'agilecrm/agilecrm.html',
        controller: 'AgilecrmCtrl as agilecrmCtrl'
      });
    }])

    .controller('AgilecrmCtrl', ['$scope', '$window', function($scope, $window) {
      var that = this;
      this.message = null;
      this.email = null;

      this.clearMessage = function() {
        that.message = null;
      };

      this.showMessage = function(message) {
        if (! message) return;
        that.message = message;
      };

      this.doSetEmail = function() {
        that.clearMessage();

        if ($window._agile) {
          $window._agile.set_email(that.email);
          that.showMessage('set_email completed.');

        } else {
          console.log('doSetEmail _agile is empty.');
        }
      };

      this.doSetEmailAndPageView = function() {
        that.clearMessage();

        if ($window._agile) {
          $window._agile.set_email(that.email);
          $window._agile.track_page_view();
          that.showMessage('set_email and track_page_view completed.');

        } else {
          console.log('doSetEmailWithPageView _agile is empty.');
        }
      };

      this.doCreateContact = function() {
        that.clearMessage();

        if (! $window._agile) {
          console.log('doCreateContact _agile is empty.');
          return;
        }

        var contact = {};

        contact.email = that.email;
        contact.first_name = 'Test';
        contact.last_name = 'Contact';
        contact.company = 'abc corp';
        contact.title = 'lead';
        contact.phone = '+1-541-754-3010';
        contact.website = 'http://www.example.com';
        var address = { 'city':'new delhi', 'state':'delhi', 'country':'india' };
        contact.address = JSON.stringify(address);
        contact.tags = 'tag1, tag2';

        // Custom fields can be added to contact object as
        contact.status = 'incomplete';
        contact.custom_id = 'EN001C';

        $window._agile.create_contact(contact, {
          success: function (data) {
            console.log('success');

            $scope.$apply(function(){
              that.showMessage('create_contact success.');
            });
          },
          error: function (data) {
            console.log('error');
            that.showMessage('create_contact error.');
          }
        });
      };

      this.doGetEmail = function() {
        that.clearMessage();

        if (! $window._agile) {
          console.log('doGetEmail _agile is empty.');
          return;
        }

        $window._agile.get_email({
          success: function(data){
            console.log(data);

            $scope.$apply(function(){
              that.showMessage(data.email);
            });
          },
          error: function(data){
            console.error(data);
            that.showMessage(data.error);
          }
        });
      };
    }]);

})();

