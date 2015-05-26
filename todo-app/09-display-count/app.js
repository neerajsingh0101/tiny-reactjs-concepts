var React = require('react');

var DisplayItem = React.createClass({

  render () {
    var item = this.props.item;
    return (
      <li key={item}>
        <input type="checkbox" checked={item.done} onChange={this.props.handleDone.bind(null, item.text)} />
        { item.text }
        <a href='#' onClick={this.props.handleDelete.bind(null, item.text)}>[x]</a>
      </li>
    );
  }

});

var DisplayList = React.createClass({

  displayItem (item) {
    return (
      <DisplayItem item={item} handleDelete={this.props.handleDelete} handleDone={this.props.handleDone} />
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

  handleDone (taskName) {
    var _items = this.state.items;
    var item = _items.filter((item) => { return (item.text === taskName); } )[0];
    item.done = !item.done;
    this.setState({ items: _items });
  },

  handleDelete (taskName) {
    var newItems = this.state.items.filter((item) => { return (item.text !== taskName); } );
    this.setState({ items: newItems });
  },

  handleSubmit (event) {
    event.preventDefault();

    var text = this.state.text;
    var newItems = this.state.items.concat({ text: text, done: false});
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
          Number of total tasks : { this.state.items.length }
        </p>

        <p>
          Number of total tasks done : { this.state.items.filter((item) => { return item.done }).length }
        </p>

        <DisplayList items={this.state.items}
                     handleDone={this.handleDone}
                     handleDelete={this.handleDelete} />
      </div>
    );
  }

});

React.render(<App />, document.body);
