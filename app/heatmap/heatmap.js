'use strict';

(function(){

  function RouteConfig ($routeProvider) {
    $routeProvider.when('/heatmap', {
      templateUrl: 'heatmap/heatmap.html',
      controller: 'HeatmapCtrl as heatmap'
    });
  }
  RouteConfig.$inject = ['$routeProvider'];

  function HeatmapController($heatmap) {
    var that = this;

    // Refer: https://github.com/pa7/heatmap.js/blob/master/examples/angular-heatmap/index.html
    function generateRandomData(len) {
      var max = 100;
      var min = 1;
      var maxX = document.body.clientWidth;
      var maxY = document.body.clientHeight;
      var data = [];
      while (len--) {
        data.push({
          x: ((Math.random() * maxX) >> 0),
          y: ((Math.random() * maxY) >> 0),
          value: ((Math.random() * max + min) >> 0),
          //radius: ((Math.random() * 50 + min) >> 0)
        });
      }
      return {
        max: max,
        min: min,
        data: data
      }
    }

    this.heatmapData = generateRandomData(1000);
    this.heatmapConfig = {
      width: 256,
      height: 256,
      blur: 0.9,
      opacity: 0.5,
      radius: 10
    };

    this.updateData = function() {
      that.heatmapData = generateRandomData(1000);
    };
  }
  HeatmapController.$inject = ['$heatmap'];

  angular.module('myApp.heatmap', ['ngRoute', 'heatmap'])
    .config(RouteConfig)
    .controller('HeatmapCtrl', HeatmapController);

})();

