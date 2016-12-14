var Fetch = require('whatwg-fetch');
var baseUrl = "https://api.spotify.com/v1/search?query=";
var baseUrl2 = "&offset=0&limit=20&type=album";

var service = {
  get: function(url) {
    return fetch(baseUrl + url + baseUrl2)
    .then(function(response){
      return response.json();
    });
  }
};

module.exports = service;
