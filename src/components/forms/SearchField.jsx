var React = require('react');

var SearchField = React.createClass({
  getInitialState: function() {
    return {value: ""}
  },

  onChange: function() {

  },

  render: function(){
    return (
      <div>
        <input placeholder="Search" onChange={this.onChange} value={this.state.value}/>
      </div>
    );
  }
});

module.exports = SearchField;
