//define the module so that app.js can recognize it
var module = angular.module('HomeController', []);

module.controller('LoginController', ['$scope', 'PopupService', 'AccountService', '$state', '$rootScope', function ($scope, PopupService, AccountService, $state, $rootScope) {
    $scope.Username = "Brandon";
    $scope.Password = "password";

    $scope.Login = function (Username, Password) {
        //make it a promise
        AccountService.Login(Username, Password).then(function (response) {
            console.log(response);
            if (response.data != null) {
                //user exists, redirect to home page
                $rootScope.UserId = response.data.ID;
                $state.go('Menu.Home');
            } else {
                //user doesn't exist
                PopupService.MessageDialog("Your credentials were incorrect. Please try again.");
            }
        });
    }
}]);

module.controller('MenuController', ['$scope', '$state', '$window', '$rootScope', function ($scope, $state, $window, $rootScope) {
    //check to see if user is logged in
    if ($rootScope.UserId == null) {
        $state.go('Login');
    }

    $scope.Logout = function () {
        $state.go('Login');
    }

    $scope.DeviceHeight = $window.innerHeight;
    $scope.DeviceWidth = $window.innerWidth;

}]);

module.controller('HomeController', ['$scope', function ($scope) {

}]);

module.controller('ProfileController', ['$scope', 'AccountService', '$rootScope', function ($scope, AccountService, $rootScope) {
    AccountService.GetUser($scope.UserId).then(function (response) {
        $scope.Model = response.data;
        console.log($scope.Model);
    });
}]);

module.controller('FriendsListController', ['$scope', function ($scope) {

}]);

module.controller('PreviousGamesController', ['$scope', function ($scope) {

}]);