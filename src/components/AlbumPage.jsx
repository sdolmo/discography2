var React = require('react');
var Reflux = require('reflux');
var Actions = require('../reflux/Actions.jsx');
var AlbumPageStore = require('../reflux/AlbumPageStore.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AlbumPage = React.createClass({
  mixins: [Reflux.listenTo(AlbumPageStore, 'onChange')],
  getInitialState: function() {
    return {items: [], albumName:"", albumId: "", tracks: [], list: []}
  },

  componentWillMount: function() {
    Actions.getTracks(this.props.params.albumId)
    this.setState({albumId: this.props.params.albumId});
    this.setState({albumName: this.props.params.albumName});
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
    var current;
    var ul = document.getElementById('playlist');
    var playlist = $('#playlist');
    var audio = document.querySelectorAll('audio');
    var source = document.getElementById('audioSource');
    var leftTrack = document.getElementById('left-track');
    var play = document.getElementById('play');
    var rightTrack = document.getElementById('right-track');
    var center = document.getElementById('center');
    var list = document.getElementsByClassName('standard');
    audio[0].volume = .20;

    console.log(list);

    ul.onclick = function(event) {
      event.preventDefault();
      if(event.target.localName == "a"){
        var target = getEventTarget(event);
        tracks = playlist.find('li a');
        len = tracks.length - 1;
        console.log(len);
        init();
        run(target, source);
      } else {
        return
      }
    };

    function init() {
      playlist.find('a').click(function(e) {
        e.preventDefault();
        link = $(this);
        current = tracks.index(link);
      });
    };

    audio[0].addEventListener('ended',function(e){
        current++;
        if(current > len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];
            console.log(current, link);
        }
        run(link,audio[0]);
    });

    $(leftTrack).hover(function(){
      $(this)[0].src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3LjgwMiAxNy44MDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3LjgwMiAxNy44MDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0iYzkyX3N0b3AiPgoJCTxwYXRoIGQ9Ik0xNS4zNjMsMC4wNDJjLTAuMTM5LTAuMDctMC4zMDMtMC4wNTEtMC40MjQsMC4wNDNMNC4xNjMsOC41ODdDNC4wNjksOC42NjQsNC4wMSw4Ljc4LDQuMDEsOC45ICAgIGMwLDAuMTE5LDAuMDU5LDAuMjQsMC4xNTMsMC4zMTRsMTAuNzc2LDguNTAyYzAuMDcxLDAuMDU3LDAuMTYyLDAuMDg2LDAuMjQ5LDAuMDg2bDAuMTc1LTAuMDM5ICAgIGMwLjEzOS0wLjA2NCwwLjIyNS0wLjIwNywwLjIyNS0wLjM2MVYwLjQwM0MxNS41ODgsMC4yNDksMTUuNTAyLDAuMTA3LDE1LjM2MywwLjA0MnoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8cGF0aCBkPSJNNS4xODgsMC4wMzNIMi41M2MtMC4xNzIsMC0wLjMxNSwwLjE4Mi0wLjMxNSwwLjQwMVYxNy4zN2MwLDAuMjIxLDAuMTQzLDAuNDAzLDAuMzE1LDAuNDAzaDIuNjU3ICAgIGMwLjE3NCwwLDAuMzE1LTAuMTgzLDAuMzE1LTAuNDAzVjAuNDM0QzUuNTAzLDAuMjE1LDUuMzYxLDAuMDMzLDUuMTg4LDAuMDMzeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgoJPGcgaWQ9IkNhcGFfMV8yNjRfIj4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
    },function(){
      $(this)[0].src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3LjgwMiAxNy44MDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3LjgwMiAxNy44MDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0iYzkyX3N0b3AiPgoJCTxwYXRoIGQ9Ik0xNS4zNjMsMC4wNDJjLTAuMTM5LTAuMDctMC4zMDMtMC4wNTEtMC40MjQsMC4wNDNMNC4xNjMsOC41ODdDNC4wNjksOC42NjQsNC4wMSw4Ljc4LDQuMDEsOC45ICAgIGMwLDAuMTE5LDAuMDU5LDAuMjQsMC4xNTMsMC4zMTRsMTAuNzc2LDguNTAyYzAuMDcxLDAuMDU3LDAuMTYyLDAuMDg2LDAuMjQ5LDAuMDg2bDAuMTc1LTAuMDM5ICAgIGMwLjEzOS0wLjA2NCwwLjIyNS0wLjIwNywwLjIyNS0wLjM2MVYwLjQwM0MxNS41ODgsMC4yNDksMTUuNTAyLDAuMTA3LDE1LjM2MywwLjA0MnoiIGZpbGw9IiNhNmE2YTYiLz4KCQk8cGF0aCBkPSJNNS4xODgsMC4wMzNIMi41M2MtMC4xNzIsMC0wLjMxNSwwLjE4Mi0wLjMxNSwwLjQwMVYxNy4zN2MwLDAuMjIxLDAuMTQzLDAuNDAzLDAuMzE1LDAuNDAzaDIuNjU3ICAgIGMwLjE3NCwwLDAuMzE1LTAuMTgzLDAuMzE1LTAuNDAzVjAuNDM0QzUuNTAzLDAuMjE1LDUuMzYxLDAuMDMzLDUuMTg4LDAuMDMzeiIgZmlsbD0iI2E2YTZhNiIvPgoJPC9nPgoJPGcgaWQ9IkNhcGFfMV8yNjRfIj4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
    });

    $(rightTrack).hover(function() {
      rightTrack.src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3LjgwNCAxNy44MDQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3LjgwNCAxNy44MDQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0iYzkzX3N0b3AiPgoJCTxwYXRoIGQ9Ik0yLjQ0LDAuMDQzYzAuMTQtMC4wNzEsMC4zMDQtMC4wNTEsMC40MjUsMC4wNDRsMTAuNzc3LDguNTAyYzAuMDk0LDAuMDc0LDAuMTUyLDAuMTkxLDAuMTUyLDAuMzEyICAgIGMwLDAuMTE4LTAuMDU5LDAuMjQtMC4xNTIsMC4zMTRMMi44NjQsMTcuNzE4Yy0wLjA3MiwwLjA1Ni0wLjE2MiwwLjA4Ni0wLjI1LDAuMDg2bC0wLjE3NS0wLjA0ICAgIGMtMC4xMzctMC4wNjUtMC4yMjMtMC4yMDYtMC4yMjMtMC4zNjJWMC40MDNDMi4yMTYsMC4yNDksMi4zMDIsMC4xMDYsMi40NCwwLjA0M3oiIGZpbGw9IiNGRkZGRkYiLz4KCQk8cGF0aCBkPSJNMTIuNjE2LDAuMDM0aDIuNjU2YzAuMTc1LDAsMC4zMTYsMC4xODEsMC4zMTYsMC4zOTl2MTYuOTM1YzAsMC4yMjItMC4xNDIsMC40MDMtMC4zMTYsMC40MDNoLTIuNjU2ICAgIGMtMC4xNzQsMC0wLjMxNi0wLjE4Mi0wLjMxNi0wLjQwM1YwLjQzNEMxMi4zLDAuMjE1LDEyLjQ0MywwLjAzNCwxMi42MTYsMC4wMzR6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+Cgk8ZyBpZD0iQ2FwYV8xXzExXyI+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==";
    },function() {
      rightTrack.src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3LjgwNCAxNy44MDQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3LjgwNCAxNy44MDQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0iYzkzX3N0b3AiPgoJCTxwYXRoIGQ9Ik0yLjQ0LDAuMDQzYzAuMTQtMC4wNzEsMC4zMDQtMC4wNTEsMC40MjUsMC4wNDRsMTAuNzc3LDguNTAyYzAuMDk0LDAuMDc0LDAuMTUyLDAuMTkxLDAuMTUyLDAuMzEyICAgIGMwLDAuMTE4LTAuMDU5LDAuMjQtMC4xNTIsMC4zMTRMMi44NjQsMTcuNzE4Yy0wLjA3MiwwLjA1Ni0wLjE2MiwwLjA4Ni0wLjI1LDAuMDg2bC0wLjE3NS0wLjA0ICAgIGMtMC4xMzctMC4wNjUtMC4yMjMtMC4yMDYtMC4yMjMtMC4zNjJWMC40MDNDMi4yMTYsMC4yNDksMi4zMDIsMC4xMDYsMi40NCwwLjA0M3oiIGZpbGw9IiNhNmE2YTYiLz4KCQk8cGF0aCBkPSJNMTIuNjE2LDAuMDM0aDIuNjU2YzAuMTc1LDAsMC4zMTYsMC4xODEsMC4zMTYsMC4zOTl2MTYuOTM1YzAsMC4yMjItMC4xNDIsMC40MDMtMC4zMTYsMC40MDNoLTIuNjU2ICAgIGMtMC4xNzQsMC0wLjMxNi0wLjE4Mi0wLjMxNi0wLjQwM1YwLjQzNEMxMi4zLDAuMjE1LDEyLjQ0MywwLjAzNCwxMi42MTYsMC4wMzR6IiBmaWxsPSIjYTZhNmE2Ii8+Cgk8L2c+Cgk8ZyBpZD0iQ2FwYV8xXzExXyI+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==";
    });

    jQuery.each($('li'), function(index, value) {
      console.log(value);
    });

    // $('li').hover(function(){
    //   $(this).css('background-color', 'rgba(255, 255, 255, 0.3)');
    // },function(){
    //   $(this).css('background-color', '');
    // });

    play.onmouseover = function() {
      play.src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icGxheS1jaXJjbGUtb3V0bGluZSI+CgkJPHBhdGggZD0iTTIwNCwzNjkuNzVMMzU3LDI1NUwyMDQsMTQwLjI1VjM2OS43NXogTTI1NSwwQzExNC43NSwwLDAsMTE0Ljc1LDAsMjU1czExNC43NSwyNTUsMjU1LDI1NXMyNTUtMTE0Ljc1LDI1NS0yNTUgICAgUzM5NS4yNSwwLDI1NSwweiBNMjU1LDQ1OWMtMTEyLjIsMC0yMDQtOTEuOC0yMDQtMjA0UzE0Mi44LDUxLDI1NSw1MXMyMDQsOTEuOCwyMDQsMjA0UzM2Ny4yLDQ1OSwyNTUsNDU5eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
    };

    play.onmouseout = function() {
        play.src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icGxheS1jaXJjbGUtb3V0bGluZSI+CgkJPHBhdGggZD0iTTIwNCwzNjkuNzVMMzU3LDI1NUwyMDQsMTQwLjI1VjM2OS43NXogTTI1NSwwQzExNC43NSwwLDAsMTE0Ljc1LDAsMjU1czExNC43NSwyNTUsMjU1LDI1NXMyNTUtMTE0Ljc1LDI1NS0yNTUgICAgUzM5NS4yNSwwLDI1NSwweiBNMjU1LDQ1OWMtMTEyLjIsMC0yMDQtOTEuOC0yMDQtMjA0UzE0Mi44LDUxLDI1NSw1MXMyMDQsOTEuOCwyMDQsMjA0UzM2Ny4yLDQ1OSwyNTUsNDU5eiIgZmlsbD0iI2E2YTZhNiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
    };

    play.onclick = function(event) {
      event.preventDefault();
      if (audio[0].play) {
        audio[0].pause();
        play.src = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icGF1c2UtY2lyY2xlLW91dGxpbmUiPgoJCTxwYXRoIGQ9Ik0xNzguNSwzNTdoNTFWMTUzaC01MVYzNTd6IE0yNTUsMEMxMTQuNzUsMCwwLDExNC43NSwwLDI1NXMxMTQuNzUsMjU1LDI1NSwyNTVzMjU1LTExNC43NSwyNTUtMjU1UzM5NS4yNSwwLDI1NSwweiAgICAgTTI1NSw0NTljLTExMi4yLDAtMjA0LTkxLjgtMjA0LTIwNFMxNDIuOCw1MSwyNTUsNTFzMjA0LDkxLjgsMjA0LDIwNFMzNjcuMiw0NTksMjU1LDQ1OXogTTI4MC41LDM1N2g1MVYxNTNoLTUxVjM1N3oiIGZpbGw9IiNhNmE2YTYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
      }
    };

    function getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement;
    };

    function run(link, player){
      console.log(link);
      thing = link.parentElement.parentElement;
      $(thing).css('background-color', 'rgba(255, 255, 255, 0.3)');
      $(thing).siblings().css('background-color', '');
      // par = link.parent();
      // par.addClass('active').siblings().removeClass('active');
      player.src = link.href;
      audio[0].load();
      audio[0].play();
    };
  },

  render: function() {

    var styles = {
      h1: {
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20,
        fontSize: 40,
        color: "white"
      },
      a: {
        textDecoration: "none",
        marginLeft: 20,
        color: "white",
        fontSize: 17
      },
      li: {
        paddingTop: 5,
        paddingBottom: 5
      },
      ul: {
        overflow: "hidden",
        overflow: "scroll",
        marginTop: 20,
        height: 300,
        paddingBottom: 50
      },
      audio: {
        display: "none"
      },
      back: {
        color: "white",
        position: "absolute",
        top: 0,
        marginTop: 23,
        marginLeft: 15
      },
      buttons: {
        textAlign: "center"
      },
      center: {
        marginLeft: 20,
        marginRight: 20,
        display: "inline"
      },
      track: {
        marginBottom: 15
      }
    };

    // Events can't be triggered when iterating through an object
    var createList = function(track, index) {
      return (
        <div className="list" key={track + index}>
          <li style={styles.li} className="standard">
            <a style={styles.a} href={track.file}>
              {track.num}&nbsp;&nbsp;&nbsp;&nbsp;{track.name}
            </a>
          </li>
          <hr/>
        </div>
      )
    };

    return (
      <div style={styles}>
        <Link to="/"><div style={styles.back}>&larr; Back to Search</div></Link>
        <h1 style={styles.h1}>{this.state.albumName}</h1>
        <audio style={styles.audio} id="audio" preload="auto" tabIndex="0" controls="controls">
          <source id="audioSource" type="audio/mp3" src=""/>
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div style={styles.buttons} className="buttons">
          <img style={styles.track} id="left-track" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3LjgwMiAxNy44MDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3LjgwMiAxNy44MDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0iYzkyX3N0b3AiPgoJCTxwYXRoIGQ9Ik0xNS4zNjMsMC4wNDJjLTAuMTM5LTAuMDctMC4zMDMtMC4wNTEtMC40MjQsMC4wNDNMNC4xNjMsOC41ODdDNC4wNjksOC42NjQsNC4wMSw4Ljc4LDQuMDEsOC45ICAgIGMwLDAuMTE5LDAuMDU5LDAuMjQsMC4xNTMsMC4zMTRsMTAuNzc2LDguNTAyYzAuMDcxLDAuMDU3LDAuMTYyLDAuMDg2LDAuMjQ5LDAuMDg2bDAuMTc1LTAuMDM5ICAgIGMwLjEzOS0wLjA2NCwwLjIyNS0wLjIwNywwLjIyNS0wLjM2MVYwLjQwM0MxNS41ODgsMC4yNDksMTUuNTAyLDAuMTA3LDE1LjM2MywwLjA0MnoiIGZpbGw9IiNhNmE2YTYiLz4KCQk8cGF0aCBkPSJNNS4xODgsMC4wMzNIMi41M2MtMC4xNzIsMC0wLjMxNSwwLjE4Mi0wLjMxNSwwLjQwMVYxNy4zN2MwLDAuMjIxLDAuMTQzLDAuNDAzLDAuMzE1LDAuNDAzaDIuNjU3ICAgIGMwLjE3NCwwLDAuMzE1LTAuMTgzLDAuMzE1LTAuNDAzVjAuNDM0QzUuNTAzLDAuMjE1LDUuMzYxLDAuMDMzLDUuMTg4LDAuMDMzeiIgZmlsbD0iI2E2YTZhNiIvPgoJPC9nPgoJPGcgaWQ9IkNhcGFfMV8yNjRfIj4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
          <div id="center" style={styles.center}><img id="play" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icGxheS1jaXJjbGUtb3V0bGluZSI+CgkJPHBhdGggZD0iTTIwNCwzNjkuNzVMMzU3LDI1NUwyMDQsMTQwLjI1VjM2OS43NXogTTI1NSwwQzExNC43NSwwLDAsMTE0Ljc1LDAsMjU1czExNC43NSwyNTUsMjU1LDI1NXMyNTUtMTE0Ljc1LDI1NS0yNTUgICAgUzM5NS4yNSwwLDI1NSwweiBNMjU1LDQ1OWMtMTEyLjIsMC0yMDQtOTEuOC0yMDQtMjA0UzE0Mi44LDUxLDI1NSw1MXMyMDQsOTEuOCwyMDQsMjA0UzM2Ny4yLDQ1OSwyNTUsNDU5eiIgZmlsbD0iI2E2YTZhNiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></div>
          {/* "paused" <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icGF1c2UtY2lyY2xlLW91dGxpbmUiPgoJCTxwYXRoIGQ9Ik0xNzguNSwzNTdoNTFWMTUzaC01MVYzNTd6IE0yNTUsMEMxMTQuNzUsMCwwLDExNC43NSwwLDI1NXMxMTQuNzUsMjU1LDI1NSwyNTVzMjU1LTExNC43NSwyNTUtMjU1UzM5NS4yNSwwLDI1NSwweiAgICAgTTI1NSw0NTljLTExMi4yLDAtMjA0LTkxLjgtMjA0LTIwNFMxNDIuOCw1MSwyNTUsNTFzMjA0LDkxLjgsMjA0LDIwNFMzNjcuMiw0NTksMjU1LDQ1OXogTTI4MC41LDM1N2g1MVYxNTNoLTUxVjM1N3oiIGZpbGw9IiNhNmE2YTYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /> */}
          {/* "paused-hover" <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icGF1c2UtY2lyY2xlLW91dGxpbmUiPgoJCTxwYXRoIGQ9Ik0xNzguNSwzNTdoNTFWMTUzaC01MVYzNTd6IE0yNTUsMEMxMTQuNzUsMCwwLDExNC43NSwwLDI1NXMxMTQuNzUsMjU1LDI1NSwyNTVzMjU1LTExNC43NSwyNTUtMjU1UzM5NS4yNSwwLDI1NSwweiAgICAgTTI1NSw0NTljLTExMi4yLDAtMjA0LTkxLjgtMjA0LTIwNFMxNDIuOCw1MSwyNTUsNTFzMjA0LDkxLjgsMjA0LDIwNFMzNjcuMiw0NTksMjU1LDQ1OXogTTI4MC41LDM1N2g1MVYxNTNoLTUxVjM1N3oiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /> */}
          <img style={styles.track} id="right-track" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE3LjgwNCAxNy44MDQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3LjgwNCAxNy44MDQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4Ij4KPGc+Cgk8ZyBpZD0iYzkzX3N0b3AiPgoJCTxwYXRoIGQ9Ik0yLjQ0LDAuMDQzYzAuMTQtMC4wNzEsMC4zMDQtMC4wNTEsMC40MjUsMC4wNDRsMTAuNzc3LDguNTAyYzAuMDk0LDAuMDc0LDAuMTUyLDAuMTkxLDAuMTUyLDAuMzEyICAgIGMwLDAuMTE4LTAuMDU5LDAuMjQtMC4xNTIsMC4zMTRMMi44NjQsMTcuNzE4Yy0wLjA3MiwwLjA1Ni0wLjE2MiwwLjA4Ni0wLjI1LDAuMDg2bC0wLjE3NS0wLjA0ICAgIGMtMC4xMzctMC4wNjUtMC4yMjMtMC4yMDYtMC4yMjMtMC4zNjJWMC40MDNDMi4yMTYsMC4yNDksMi4zMDIsMC4xMDYsMi40NCwwLjA0M3oiIGZpbGw9IiNhNmE2YTYiLz4KCQk8cGF0aCBkPSJNMTIuNjE2LDAuMDM0aDIuNjU2YzAuMTc1LDAsMC4zMTYsMC4xODEsMC4zMTYsMC4zOTl2MTYuOTM1YzAsMC4yMjItMC4xNDIsMC40MDMtMC4zMTYsMC40MDNoLTIuNjU2ICAgIGMtMC4xNzQsMC0wLjMxNi0wLjE4Mi0wLjMxNi0wLjQwM1YwLjQzNEMxMi4zLDAuMjE1LDEyLjQ0MywwLjAzNCwxMi42MTYsMC4wMzR6IiBmaWxsPSIjYTZhNmE2Ii8+Cgk8L2c+Cgk8ZyBpZD0iQ2FwYV8xXzExXyI+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
        </div>
        <ul style={styles.ul} id="playlist">
          {this.state.tracks.map(createList)}
        </ul>
      </div>
    );
  }
});

module.exports = AlbumPage;
