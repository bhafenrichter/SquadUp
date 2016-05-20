var module = angular.module('AccountModule', []);

var baseurl = "http://localhost:50236/";

module.service('AccountService', ['$http', function ($http) {
    var service = {};

    service.Login = function (Username, Password) {
        return $http.get(baseurl + "/api/Login?Username=" + Username + "&Password=" + Password)
            .success(function (data) {
                if (data != null) {
                    return data;
                } else {
                    return {};
                }
            })
            .error(function () {
                return {};
            });
    };
    
    return service;
}]);