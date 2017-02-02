var Fetch = require('whatwg-fetch');
var baseUrl = "https://api.spotify.com/v1/search?q=";
var baseUrl2 = "&type=album,artist,track";

var service = {
  get: function(url) {
    return fetch(baseUrl + url + baseUrl2)
    .then(function(response){
      return response.json();
    });
  }
};

module.exports = service;
