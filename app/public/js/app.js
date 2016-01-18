var forkItOverApp = angular.module('forkItOverApp', [
    'ngRoute',
    'forkItOverControllers',
    'forkItOverServices'
    ]);

forkItOverApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'partials/login.html'
  })
  .when('/:params', {
    controller: 'HomeController',
    templateUrl: 'partials/home.html'
  })
  .otherwise({ redirectTo: '/login' });
}]);

forkItOverApp.run(['$rootScope', '$location', '$http', 'SpotifyAuth',
  function ($rootScope, $location, $http, SpotifyAuth) {
    $rootScope.stateKey = 'spotify_auth_state';

    $rootScope.globals = SpotifyAuth.getHashParams();
    var storedState = localStorage.getItem($rootScope.stateKey);

    if ($rootScope.globals.access_token && (
        $rootScope.globals.state == null ||
        $rootScope.globals.state !== storedState)) {
      alert('There was an error during the authentication');
    }

    // keep user logged in after page refresh
    if ($rootScope.globals.access_token) {
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.access_token;
    }

    $rootScope.$on('$locationChangeStart', function (event, neent) {
      // redirect to login page if not logged in
      if ($location.path() !== '/login' && !$rootScope.globals.access_token) {
        $location.path('/login');
      }
    });
  }
]);
