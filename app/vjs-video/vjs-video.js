'use strict';

angular.module('myApp.vjsVideo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vjs-video', {
    templateUrl: 'vjs-video/vjs-video.html',
    controller: 'VjsVideoCtrl'
  });
}])

.controller('VjsVideoCtrl', ['$scope', function($scope) {
  var that = this;

  this.player = videojs("example_video_1", {}, function(){
    // Player (this) is initialized and ready.
  });

  // Refer: http://docs.videojs.com/docs/api/player.html#Methodssrc
  this.player.src([
    { type: "video/mp4", src: "//vjs.zencdn.net/v/oceans.mp4" },
    { type: "video/webm", src: "//vjs.zencdn.net/v/oceans.webm" },
    { type: "video/ogg", src: "//vjs.zencdn.net/v/oceans.ogv" }
  ]);

  // Refer: http://stackoverflow.com/questions/24607140/angularjs-controller-destructor
  $scope.$on("$destroy", function() {
    if (that.player) {
      // Refer: http://stackoverflow.com/questions/14812319/videojs-unable-to-destroy-and-initialize
      that.player.dispose();
      that.player = null;
    }
  });
}]);

