//define the module so that app.js can recognize it
var module = angular.module('HomeController', []);

module.controller('LoginController', ['$scope', 'PopupService', 'AccountService', '$state', function ($scope, PopupService, AccountService, $state) {
    $scope.Username = "Brandon";
    $scope.Password = "password";

    $scope.Login = function (Username, Password) {
        //make it a promise
        AccountService.Login(Username, Password).then(function (response) {
            console.log(response);
            if (response.data != null) {
                //user exists, redirect to home page
                $state.go('Menu.Home');
            } else {
                //user doesn't exist
                PopupService.MessageDialog("Your credentials were incorrect. Please try again.");
            }
        });
    }
}]);

module.controller('MenuController', ['$scope', '$state', function ($scope, $state) {
    $scope.Logout = function () {
        $state.go('Login');
    }
}]);

module.controller('HomeController', ['$scope', function ($scope) {

}]);

module.controller('ProfileController', ['$scope', function ($scope) {

}]);

module.controller('PreviousGamesController', ['$scope', function ($scope) {

}]);