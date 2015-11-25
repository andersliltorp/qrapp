var firebaseApp = angular.module('starter', ['ionic', 'firebase', 'ngCordovaOauth']);
var fb = new Firebase("https://sweltering-torch-8697.firebaseio.com");
 
firebaseApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
 
 
firebaseApp.controller("ExampleController", function($scope, $rootScope, $firebaseAuth, $cordovaOauth) {
 
    var auth = $firebaseAuth(fb);
 
    $scope.login = function() {
        $cordovaOauth.facebook("631605996943053", ["email"]).then(function(result) {
            auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
                console.log(JSON.stringify(authData));
                $rootScope.auth = authData;
            }, function(error) {
                console.error("ERROR: " + error);
            });
        }, function(error) {
            console.log("ERROR: " + error);
        });
    }
 
});
