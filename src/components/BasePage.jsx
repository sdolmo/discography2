var React = require('react');

var BasePage = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = BasePage;
