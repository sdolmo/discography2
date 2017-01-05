var React = require('react');
var Reflux = require('reflux');
var Actions = require('../reflux/Actions.jsx');
var AlbumPageStore = require('../reflux/AlbumPageStore.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AlbumPage = React.createClass({
  mixins: [Reflux.listenTo(AlbumPageStore, 'onChange')],
  getInitialState: function() {
    return {items: [], albumId: "", tracks: []}
  },

  componentWillMount: function() {
    Actions.getTracks(this.props.params.albumId)
    this.setState({albumId: this.props.params.albumId});
  },

  onChange: function(event, data) {
    var items = data.items;
    this.setState({items: items});

    var tracks = data.items.map(function(obj){
      return {"num": obj.track_number, "name": obj.name, "file": obj.preview_url};
    });
    this.setState({tracks: tracks})
  },

  handleClick: function() {

  },

  componentDidMount: function() {
    var current = 0;
    var ul = document.getElementById('playlist');
    var audio = document.querySelectorAll('audio');
    var source = document.getElementById('audioSource');
    audio[0].volume = .10;

    ul.onclick = function(event) {
      event.preventDefault();
      var target = getEventTarget(event);
      run(target, source);
    };

    function getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement;
    };

    function run(link, player){
      // var thing = link.parentElement;
      // thing.addClass('active');
      player.src = link.href;
      // par = link.parent();
      // par.addClass('active').siblings().removeClass('active');
      audio[0].load();
      audio[0].play();
    }
  },

  render: function() {

    var styles = {
      a:{
        textDecoration: "none",
        color: "white"
      },
      ul: {
        overflow: "hidden",
        overflow: "scroll",
        marginTop: 20,
        height: 450,
        paddingBottom: 50
      },
    };

    // Events can't be triggered when iterating through an object
    var createList = function(track, index) {
      return (
          <li key={track + index} className="standard">
            <a style={styles.a} href={track.file}>{track.name}</a>
            <hr/>
          </li>
      )
    };

    return (
      <div style={styles}>
        <Link to="/"><div><p>Search</p></div></Link>
        <audio id="audio" preload="auto" tabIndex="0" controls="controls">
          <source id="audioSource" type="audio/mp3" src=""/>
          Your browser does not support the <code>audio</code> element.
        </audio>
        <ul style={styles.ul} id="playlist">
          {this.state.tracks.map(createList)}
        </ul>
      </div>
    );
  }
});

module.exports = AlbumPage;
