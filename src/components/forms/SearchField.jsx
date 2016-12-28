var React = require('react');

var SearchField = React.createClass({
  getInitialState: function() {
    return {value: ""}
  },

  onChange: function(e) {
    this.setState({value: e.target.value});
  },

  componentDidMount: function() {
    $('.searchBox').on('click', function(){
      $(this).addClass('clicked');
    });

    $('.searchBox').hover(
      function() {
        $(this).addClass('hover');
      }, function() {
        $(this).removeClass('hover');
      }
    );
  },

  clear: function() {
    this.setState({value: ""});
  },

  render: function(){
    var styles = {
      display: "inline"
    };

    return (
      <div style={styles}>
        <input className="searchBox" placeholder="Search" onChange={this.onChange} value={this.state.value}/>
      </div>
    );
  }
});

module.exports = SearchField;
