'use strict';

(function(){

  function RouteConfig ($routeProvider) {
    $routeProvider.when('/heatmap', {
      templateUrl: 'heatmap/heatmap.html',
      controller: 'HeatmapCtrl as heatmap'
    });
  }
  RouteConfig.$inject = ['$routeProvider'];

  // TODO
  function HeatmapJsToolitpController() {
  }
  function HeatmapJsToolitpDirective() {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
      }
    };
  }

  function HeatmapController($heatmap) {
    var that = this;


    this.get_heatmap_instance = function() {
      return $heatmap.getInstance('heatmap-1');
    };

    // Refer: https://github.com/pa7/heatmap.js/blob/master/examples/angular-heatmap/index.html
    this.generate_random_data = function(len) {
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

    this.heatmapData = this.generate_random_data(1000);
    this.heatmapConfig = {
      width: 256,
      height: 256,
      blur: 0.9,
      opacity: 0.5,
      radius: 10
    };

    this.updateData = function() {
      that.heatmapData = that.generate_random_data(1000);
    };

    this.tooltip = document.querySelector('.heatmap-tooltip');

    this.update_tooltip = function updateTooltip(x, y, value) {
      var transform = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
      that.tooltip.style.MozTransform = transform;
      that.tooltip.style.msTransform = transform;
      that.tooltip.style.OTransform = transform;
      that.tooltip.style.WebkitTransform = transform;
      that.tooltip.style.transform = transform;
      that.tooltip.innerHTML = value;
    };

    this.on_mousemove = function($event) {
      //console.log($event);
      var x = $event.offsetX;
      var y = $event.offsetY;
      console.log('x:y', x, y);

      // getValueAt gives us the value for a point p(x/y)
      var instance = that.get_heatmap_instance();
      var value = instance.getValueAt({ x: x, y: y });
      console.log('heatmapInstance.getValueAt', value);

      that.tooltip.style.display = 'block';
      that.update_tooltip(x, y, value);
    };

    this.on_mouseleave = function($event) {
      console.log($event);
      that.tooltip.style.display = 'none';
    };
  }
  HeatmapController.$inject = ['$heatmap'];

  angular.module('myApp.heatmap', ['ngRoute', 'heatmap'])
    .config(RouteConfig)
    .controller('HeatmapCtrl', HeatmapController);

})();

