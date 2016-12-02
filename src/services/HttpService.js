var Fetch = require('whatwg-fetch');
var baseUrl = "http://localhost:9000";

var service = {
  get: function() {
    return fetch(baseUrl + url)
    .then(function(response){
      return response.json();
    });
  }
};

module.exports = service;
