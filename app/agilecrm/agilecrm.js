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

      this.doCreateContact = function() {
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
          },
          error: function (data) {
            console.log('error');
          }
        });
      };
    }]);

})();

