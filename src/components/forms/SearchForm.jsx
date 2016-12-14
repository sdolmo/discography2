var React = require('react');
var SearchField = require('./SearchField.jsx');

var SearchForm = React.createClass({
  render: function() {
    return (
      <div>
        <SearchField />
      </div>
    );
  }
});

module.exports = SearchForm;
