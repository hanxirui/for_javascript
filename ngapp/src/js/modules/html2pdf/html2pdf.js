'use strict';

//定义module html2pdfApp
var html2pdfApp = angular.module('html2pdfApp', []);

//定义controller html2pdfController
html2pdfApp.controller('html2pdfController', function html2pdfController($scope, $http) {

    $scope.generatePdf = function () {
        // create the window before the callback
        // var win = window.open('', '_blank');
        $http({
            method: 'GET',
            url: 'http://172.16.3.74/overview/report/metric?id=99e6f1bb-a1d9-43ba-adf9-7250152980e1&reloadTime=1500878001567'
        }).then(function (docDefinition) {
            // pass the "win" argument
            pdfMake.createPdf(docDefinition).print({});
        });
    };

    $scope.topdf = function () {
        debugger;
        // Simple GET request example:
        $http({
            method: 'GET',
            url: '/html2pdf/html2pdf'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

});