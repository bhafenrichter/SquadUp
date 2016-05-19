//define the module so that app.js can recognize it
var module = angular.module('HomeController', []);

module.controller('LoginController', ['$scope', 'PopupService', 'AccountService', '$state', function ($scope, PopupService, AccountService) {
    $scope.Username = "Brandon";
    $scope.Password = "password";
    
    $scope.Login = function (Username, Password) {
        //make it a promise
        AccountService.Login(Username, Password).then(function (response) {
            console.log(response);
            if (response.data != null) {
                //user exists, redirect to home page

            } else {
                //user doesn't exist
                PopupService.MessageDialog("Your credentials were incorrect. Please try again.");
            }
        });
            //.then(function (response) {
            //if (response) {
            //    set the user data and go to next page
            //    $rootScope.User = response;
            //    $state.go("Home");
            //} else {
            //    tell the user their credentials were incorrect
            //    PopupService.MessageDialog("Your credentials were incorrect. Please try again.");
            //}
            
    }
}]);