//
// Refer: http://blog.dargiel.net/how-to-open-a-modal-from-any-state-using-ui-router/
//
var app = angular.module('plunker', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {
  /**
   * Specify a default state
   */
  $urlRouterProvider.otherwise('/');
  /**
   * define a sample state
   */
  $stateProvider
    .state('index', {
      url: '/',
      template: '<h2>Hello world</h2>'
    })
    /**
     * Then define a child state for the modal window
     */
    .state('index.terms', {
      /**
       * Only the URL is required, you don't need a controller or a template for the state
       */
      url: '/terms',
      /**
       * Open the modal window when the onEnter event is fired
       */
      onEnter: function($modal){
        $modal.open({
          template: [
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<h3 class="modal-title">Regulamin</h3>',
            '</div>',
            '<div class="modal-body">',
            '$1. Give us all your money!',
            '</div>',
            '<div class="modal-footer">',
            '<button class="btn btn-primary" ng-click="$dismiss()">OK</button>',
            '</div>',
            '</div>'
          ].join(''),
          controller: function($scope){
            // do whatever you need here.
          }
        });
      }
    })
    .state('terms', {
      url: '/terms',
    });
});

app.run(function ($rootScope, $modal) {
  /**
   * Listen to the `$stateChangeStart` event
   */
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    /**
     * if the new state is not "terms", then ignore it
     */
    if(toState.name !== 'terms') return;
    /**
     * Open the modal window
     */
    $modal.open({
      template: [
        '<div class="modal-content">',
        '<div class="modal-header">',
        '<h3 class="modal-title">Regulamin</h3>',
        '</div>',
        '<div class="modal-body">',
        '$1. Give us all your money!',
        '</div>',
        '<div class="modal-footer">',
        '<button class="btn btn-primary" ng-click="$dismiss()">OK</button>',
        '</div>',
        '</div>'
      ].join(''),
      controller: function($scope){
        // Do whatever you need here.
      }
    });
    /**
     * Prevent the transition to the dummy state, stay where you are
     */
    event.preventDefault();
  })
});

