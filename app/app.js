'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'myApp.guess-the-artist',
    'myApp.services'
]).config(['$locationProvider', '$routeProvider','$sceDelegateProvider', function ($locationProvider, $routeProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://itunes.apple.com/**'
    ]);
    $locationProvider.hashPrefix('!');


    $routeProvider.otherwise({redirectTo: '/'});
}]);
