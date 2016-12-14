var React = require('react');

var AlbumItems = React.createClass({
  render: function(){
    return (
      <div>
        <h4>{this.props.albumTitle}</h4>
        <img src={this.props.albumImage} />
      </div>
    );
  }
});

module.exports = AlbumItems;
