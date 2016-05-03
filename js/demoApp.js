
'use strict';



var demoApp = angular.module('demoApp', ['gitHubApp']);

var gitHubApp = angular.module('gitHubApp',['ngAnimate','app','ngRoute']);

var app = angular.module("app", ["chart.js"])
  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      // colours : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      // responsive: true
    });

  }])




