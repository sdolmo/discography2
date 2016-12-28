var React = require('react');
var AlbumItems = require('./AlbumItems.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Album = React.createClass({
  render: function() {

    var styles = {
      overflow: "hidden",
      overflow: "scroll",
      marginTop: 30,
      textAlign: "center",
      height: 550,
      paddingBottom: 50
    };

    var createItem = function(album, index){
      if (album.album_type === "album") {
        return (
          <div key={index + album} className="col-sm-4 albums">
            <Link to="/album/1"><AlbumItems albumImage={album.images[1].url} albumTitle={album.name} /></Link>
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
