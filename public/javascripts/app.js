var app = angular.module('app', ['ngAnimate','ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $stateProvider
    .state('intro', {
        url: '/',
        controller: 'mainCtrl'
    })
    .state('contact', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
    })
    .state('portfolio', {
        abstract: true,
        templateUrl: 'templates/portfolio.html',
        controller: 'portfolioCtrl'
    })
    .state('portfolio.gallery', {
        url: '/portfolio',
        templateUrl: "templates/portfolio-gallery.html",
    })
    .state('portfolio.item', {
        url: '/portfolio/:projectName',
        templateUrl: "templates/portfolio-item.html",
        controller: "portfolioCtrl"
    })
    .state('resume', {
        url: '/resume',
        templateUrl: 'templates/resume.html',
        controller: 'resumeCtrl'
    });

    $urlRouterProvider.otherwise('/')

}]);

app.controller('mainCtrl', ['$scope','$rootScope', function ($scope, $rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    $rootScope.hideIntro = false;
}]);

app.controller('contactCtrl', ['$scope','$rootScope', function ($scope, $rootScope){
    console.log("welcome to the contact page");
    $rootScope.hideIntro = true;
}]);

app.controller('portfolioCtrl', ['$scope','$rootScope','$stateParams', function ($scope, $rootScope, $stateParams){
    $rootScope.hideIntro = true;

    $scope.project = {
                name: $stateParams.projectName,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae reprehenderit, eligendi suscipit necessitatibus, deserunt vero distinctio, quis voluptatum voluptatem vitae alias officiis dolorum! Non quaerat ducimus ipsam tempora dolorem voluptatum!",
                images: [
                    'images/Passkeep01.png',
                    'images/Passkeep02.png',
                    'images/Passkeep03.png'
                ]
            };
}]);

app.controller('resumeCtrl', ['$scope','$rootScope', function ($scope, $rootScope){
    $rootScope.hideIntro = true;
}]);
