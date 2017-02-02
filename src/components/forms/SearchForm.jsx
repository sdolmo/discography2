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

    if (searchTerm) {
      this.refs.fieldSearch.clear();

      Actions.getAlbums(searchTerm);
    }
  },

  onChange: function(event, data) {
    var albums = data.albums.items;
    console.log(albums);
    this.setState({albums: albums});
    this.props.handleData()
  },

  componentDidMount: function() {
    $('.searchButton').hover(function(){
      $(this).addClass('hover');
      },
      function() {
        $(this).removeClass('hover');
      }
    );
    $('.searchButton').on('click', function() {
      $('.searchBox').removeClass('clicked')
    });
  },

  render: function() {
    var styles = {
      textAlign: "center"
    };

    return (
      <div style={styles}>
        <SearchField ref="fieldSearch"/>
        <button onClick={this.onSubmit} className="searchButton"></button>
      </div>
    );
  }
});

module.exports = SearchForm;
