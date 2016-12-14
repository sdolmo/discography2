var React = require('react');
var SearchField = require('./SearchField.jsx');
var Reflux = require('reflux');
var Actions = require('../../reflux/Actions.jsx');
var AlbumStore = require('../../reflux/AlbumStore.jsx');

var SearchForm = React.createClass({
  mixins: [Reflux.listenTo(AlbumStore, 'onChange')],
  getInitialState: function() {
    return {albums: []}
  },

  onSubmit: function(e) {
    e.preventDefault();
    var searchTerm = this.refs.fieldSearch.state.value;

    this.refs.fieldSearch.clear();

    Actions.getAlbums(searchTerm);
  },

  onChange: function(event, data) {
    var albums = data.albums.items;
    console.log(albums);
    this.setState({albums: albums});
    this.props.handleData()
  },

  render: function() {
    return (
      <div>
        <SearchField ref="fieldSearch"/>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
});

module.exports = SearchForm;
