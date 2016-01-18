var forkItOverControllers = angular.module('forkItOverControllers', []);

forkItOverControllers.controller('HomeController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
  $scope.playlists = [];
  var pageThroughPlaylists = function(response) {
    for (var i = 0; i < response.items.length; ++i) {
      var playlist = response.items[i];
      if (playlist.owner.id !== $rootScope.globals.userId) {
        $scope.playlists.push(playlist);
      }
    }
    if (response.next !== null) {
      $http.get(response.next).success(pageThroughPlaylists);
    }
  };
  $http.get('https://api.spotify.com/v1/me').success(function(response) {
    $scope.user = response;
    $rootScope.globals.userId = response.id;
    $http.get('https://api.spotify.com/v1/me/playlists').success(pageThroughPlaylists);
  });
}]);

forkItOverControllers.controller('LoginController', ['$rootScope', '$scope', '$http', 'SpotifyAuth',
  function ($rootScope, $scope, $http, SpotifyAuth) {
    // Click-listener for logging in
    $scope.login = function() {
      var client_id = '0387935940ab406d9cd41525a9fac4fb'; // Your client id
      var redirect_uri = 'http://localhost:8889/'; // Your redirect uri

      var state = SpotifyAuth.generateRandomString(16);
      localStorage.setItem($rootScope.stateKey, state);
      var scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public ' +
        'playlist-modify-private playlist-read-collaborative user-follow-read';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);

      window.location = url;
    };
  }
]);
