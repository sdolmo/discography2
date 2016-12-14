var React = require('react');
var SearchForm = require('./forms/SearchForm.jsx');

var BasePage = React.createClass({
  render: function(){
    return (
      <div>
        <SearchForm />
        {this.props.children}
      </div>
    );
  }
});

module.exports = BasePage;
