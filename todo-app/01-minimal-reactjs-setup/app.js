var React = require('react');

var HelloMessage = React.createClass({

  render () {
    return (
      <div> Hello John </div>
    );
  }

});

React.render(<HelloMessage />, document.body);
