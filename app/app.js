'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate',
  'myApp.view1',
  'myApp.view2',
  'myApp.directive',
  'myApp.vjsVideo',
  'myApp.heatmap',
  'myApp.agilecrm',
  'myApp.form',
  'myApp.capture',
  'myApp.version'
])
  .config(RouterConfig)
  .config(TranslateConfig)
  .service('GoogleAnalyticsService', GoogleAnalyticsService);

function RouterConfig($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}
RouterConfig.$inject = ['$locationProvider', '$routeProvider'];

function TranslateConfig($translateProvider, $translatePartialLoaderProvider) {
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/languages/{part}/{lang}.json'
  });

  $translatePartialLoaderProvider.addPart('common');

  $translateProvider.fallbackLanguage('en');

  $translateProvider.useSanitizeValueStrategy('sanitize');
}
TranslateConfig.$inject = ['$translateProvider', '$translatePartialLoaderProvider'];

function GoogleAnalyticsService($window) {
  var that = this;
  this.PAGE_NAME = 'Angular Sandbox';
  this.EVENT_VIRTUAL_PAGEVIEW = 'VirtualPageview';
  this.EVENT_EVENT_TRACKING = 'EventTracking';

  this.setPage = function(name, prefix) {
    var url = '/' + prefix + '/' + name;
    var title = [that.PAGE_NAME, prefix, name].join(' ');

    $window.dataLayer = $window.dataLayer || [];

    $window.dataLayer.push({
      'event': that.EVENT_VIRTUAL_PAGEVIEW,
      'virtualPageUrl': url,
      'virtualPageTitle': title
    });
  };

  this.sendEvent = function(category, action, label, value) {
    $window.dataLayer = $window.dataLayer || [];

    var params = {
      'event': that.EVENT_EVENT_TRACKING,
    };

    if (category) params.eventCategory = category;
    if (action) params.eventAction = action;
    if (label) params.eventLabel= label;
    if (value) params.eventValue= value;

    $window.dataLayer.push(params);
  };
}
GoogleAnalyticsService.$inject = ['$window'];

