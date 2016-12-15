var React = require('react');

var SearchField = React.createClass({
  getInitialState: function() {
    return {value: ""}
  },

  onChange: function(e) {
    this.setState({value: e.target.value});
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
        <input placeholder="Search" onChange={this.onChange} value={this.state.value}/>
      </div>
    );
  }
});

module.exports = SearchField;
