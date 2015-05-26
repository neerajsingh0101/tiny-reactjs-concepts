var React = require('react');

var DisplayList = React.createClass({

  displayItem (item) {
    return (
      <li key={item}>{ item }</li>
    );
  },

  render () {
    return (
      <ul>{ this.props.items.map(this.displayItem) }</ul>
    );
  }
});

var App = React.createClass({

  getInitialState () {
    return { text: '', items: [] };
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

        <DisplayList items={this.state.items} />
      </div>
    );
  }

});

React.render(<App />, document.body);
