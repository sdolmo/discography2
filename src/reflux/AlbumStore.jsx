var HTTP = require('../services/HttpService.js');
var Reflux = require('reflux');
var Actions = require('./Actions.jsx');

var AlbumStore = Reflux.createStore({
  listenables: [Actions],
  getAlbums: function(term) {
    HTTP.get(term)
    .then(function(json) {
    console.log(json);
    this.albums = json;
    this.trigger('change', this.albums);
    }.bind(this));
  }
});

module.exports = AlbumStore;
