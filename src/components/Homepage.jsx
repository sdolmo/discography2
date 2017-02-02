var React = require('react');
var SearchForm = require('./forms/SearchForm.jsx');
var Album = require('./albums/Album.jsx');

var HomePage = React.createClass({
  getInitialState: function() {
    return {albums: []};
  },

  handleData: function() {
    this.setState({albums: this.refs.formData.state.albums})
  },

  render: function() {

    return (
      <div>
        <SearchForm ref="formData" handleData={this.handleData}/>
        <Album albums={this.state.albums}/>
      </div>
    );
  }
});

module.exports = HomePage;
