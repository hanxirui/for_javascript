'use strict';

//定义module phonecatApp
var phonecatApp = angular.module('phonecatApp', []);

//定义controller PhoneListController
phonecatApp.controller('PhoneListController', function PhoneListController($scope) {
  $scope.phones = [{
    name: 'Nexus S',
    snippet: 'Fast just got faster with Nexus S.'
  }, {
    name: 'Motorola XOOM with wifi',
    snippet: 'Fast just got faster with Nexus S.'
  }, {
    name: 'Huawei Mate9',
    snippet: 'The Next, Next Generation tablet.'
  }];

  $scope.order = {
    cash: "100$"
  };

  $scope.style = {
    width: '100px'
  };

  $scope.show = function(){
      console.log($scope.aselect);
    }

});