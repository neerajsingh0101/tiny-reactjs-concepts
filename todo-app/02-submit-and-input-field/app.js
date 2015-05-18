var React = require('react');

var HelloMessage = React.createClass({

  handleSubmit (event) {
    event.preventDefault();
    console.log('form was submitted');
  },

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div> TODO </div>
          <input></input>
          <button> Submit </button>
        </form>
      </div>
    );
  }

});

React.render(<HelloMessage />, document.body);
