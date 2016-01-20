var forkItOverServices = angular.module('forkItOverServices', []);

forkItOverServices.factory('SpotifyAuth', ['$http', '$location', '$rootScope',
  function($http, $location, $rootScope) {
    var service = {};

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    service.getHashParams = function() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = $location.path().substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    };

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    service.generateRandomString = function(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    return service;
  }
]);
