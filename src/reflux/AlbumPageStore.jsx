var HTTP = require('../services/HttpService2.js');
var Reflux = require('reflux');
var Actions = require('./Actions.jsx');

var AlbumPageStore = Reflux.createStore({
  listenables: [Actions],
  getTracks: function(url) {
    HTTP.get(url)
    .then(function(json) {
    console.log(json);
    this.tracks = json;
    this.trigger('change', this.tracks);
    }.bind(this));
  }
});

module.exports = AlbumPageStore;
