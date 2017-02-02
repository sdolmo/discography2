var React = require('react');
var AlbumPage = require('../AlbumPage.jsx');
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
      height: 450,
      paddingBottom: 50
    };

    var createItem = function(album, index){
      if (album.album_type === "album") {
        return (
          <div key={index + album} className="col-sm-4 albums">
            <Link to={`/album/${album.name}/${album.id}`}><AlbumItems albumImage={album.images[1].url} albumTitle={album.name} albumLink={album.href}/></Link>
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
