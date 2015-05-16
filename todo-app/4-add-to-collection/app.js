var React = require('react');

var HelloMessage = React.createClass({

  getInitialState () {
    return { text: '', items: [] }
  },

  handleSubmit (event) {
    event.preventDefault();

    var text = this.state.text;
    var newItems = this.state.items.concat(text);
    this.setState({ text: '', items: newItems });
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

        <p>
          { this.state.items.toString() }
        </p>
      </div>
    );
  }

});

React.render(<HelloMessage />, document.body);
