var React = require('react');

var HelloMessage = React.createClass({

  getInitialState () {
    return { text: '' }
  },

  handleSubmit (event) {
    event.preventDefault();

    var text = this.state.text;
    console.log("adding to collection " + text);
    this.setState({ text: '' });
  },

  handleChange (event) {
    var text = event.target.value;
    this.setState({ text: text });
  },

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div> TODO </div>
          <input onChange={this.handleChange} value={this.state.text} />
          <button> Submit </button>
        </form>
      </div>
    );
  }

});

React.render(<HelloMessage />, document.body);
