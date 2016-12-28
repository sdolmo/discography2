var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AlbumPage = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="/"><div><p>Search</p></div></Link>
        <h1>Album</h1>
      </div>
    );
  }
});

module.exports = AlbumPage;
