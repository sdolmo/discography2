var Fetch = require('whatwg-fetch');
var baseUrl = "https://api.spotify.com/v1/albums/";
var uri = "/tracks"

var service2 = {
  get: function(url) {
    return fetch(baseUrl + url + uri)
    .then(function(response){
      return response.json();
    });
  }
};

module.exports = service2;
