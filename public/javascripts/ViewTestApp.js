var app = angular.module('ViewTestApp', ['ngAnimate','ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/',
        controller: function ($rootScope){
            $rootScope.navTop = false
            console.log($rootScope.navTop);
        }

    })
    .state('contact', {
        url: '/contact',
        templateUrl: "templates/contact.html",
        controller: function ($rootScope){
            $rootScope.navTop = true;
            console.log($rootScope.navTop);
        }

    })
    .state('resume', {
        url: 'resume',
        templateUrl: "templates/resume.html",
        controller: function ($rootScope){
            $rootScope.navTop = true;
            console.log($rootScope.navTop);
        }
    });

    $urlRouterProvider.otherwise('/');
}]);


app.controller('mainCtrl', ['$scope', function ($rootScope){
}]);






