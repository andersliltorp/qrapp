var firebaseApp = angular.module('starter', ['ionic', 'firebase', 'ngCordovaOauth', 'ja.qr']);
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

firebaseApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('test', {
        url: '/test',
        templateUrl: 'templates/test.html', // found in the templates folder we created in the beginning - login.html
        controller: 'ExampleController' // this is found in loginController.js
      })

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html', // found in the templates folder we created in the beginning - login.html
        controller: 'ExampleController' // this is found in loginController.js
      })

    /*
    This is for handling if a you go to a link like "localhost:8000/#/facebook"
    it will not exists and then you will betaken to the defined state
    in this case the login state
     */
    $urlRouterProvider.otherwise('/home')
  })
 
 
firebaseApp.controller("ExampleController", function($scope, $rootScope, $state, $firebaseAuth, $cordovaOauth) {
 
    var auth = $firebaseAuth(fb);
 
    $scope.login = function() {
        $cordovaOauth.facebook("631605996943053", ["email"]).then(function(result) {
            auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
                $rootScope.authData = authData;
                console.log(authData);
                

                var ref = new Firebase("https://sweltering-torch-8697.firebaseio.com/");
                var users = ref.child("users");

                users.once('value', function(snapshot) {
                  if (!snapshot.hasChild(authData.facebook.id)) {
                    var phone = prompt("Please enter your phone no.", "");
                    users.child(authData.facebook.id).set({ 
                       "fb": authData.facebook,
                       "phone": phone,
                       "id": authData.facebook.id,
                    });
                  }
                });

                $state.go('test');
            }, function(error) {
                console.error("ERROR: " + error);
            });
        }, function(error) {
            console.log("ERROR: " + error);
        });
    }
 
});
