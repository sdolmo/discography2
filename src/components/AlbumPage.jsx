var React = require('react');
var Reflux = require('reflux');
var Actions = require('../reflux/Actions.jsx');
var AlbumPageStore = require('../reflux/AlbumPageStore.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AlbumPage = React.createClass({
  mixins: [Reflux.listenTo(AlbumPageStore, 'onChange')],
  getInitialState: function() {
    return {tracks: [], album: ""}
  },

  componentWillMount: function() {
    Actions.getTracks(this.props.params.albumId)
    this.setState({album: this.props.params.albumId});
  },

  onChange: function(event, data) {
    console.log(data);
  },

  render: function() {
    return (
      <div>
        <Link to="/"><div><p>Search</p></div></Link>
        <h1>{this.state.album}</h1>
      </div>
    );
  }
});

module.exports = AlbumPage;
