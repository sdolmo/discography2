var React = require('react');
var AlbumItems = require('./AlbumItems.jsx');

var Album = React.createClass({
  render: function() {

    var styles = {
      overflow: "scroll",
      marginTop: 30,
      textAlign: "center"
    };

    var createItem = function(album, index){
      if (album.album_type === "album") {
        return (
          <div key={index + album} className="col-sm-4 albums">
            <AlbumItems albumImage={album.images[1].url} albumTitle={album.name} />
          </div>
        );
      }
    };

    return (
      <div style={styles}>
        <ul>{this.props.albums.map(createItem)}</ul>
      </div>
    );
  }
});

module.exports = Album;
