var React = require('react');

var AlbumItems = React.createClass({

  render: function(){
    var styles = {
      h4: {
        fontSize: 10,
        color: "white"
      },

      img: {
        width: 200,
        marginBottom: 40
      }
    };

    return (
      <div>
        <h4 style={styles.h4}>{this.props.albumTitle}</h4>
        <br />
        <img style={styles.img} src={this.props.albumImage} />
      </div>
    );
  }
});

module.exports = AlbumItems;
