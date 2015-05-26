var React = require('react');

var DisplayItem = React.createClass({

  getInitialState () {
    return { done: false };
  },

  handleOnChange () {
    var _done = !this.state.done;
    this.setState({ done: _done });
  },


  render () {
    var item = this.props.item;
    return (
      <li key={item}>
        <input type="checkbox" checked={this.state.done} onChange={this.handleOnChange} />
        { item }
        <a href='#' onClick={this.props.handleDelete.bind(null, item)}>[x]</a>
      </li>);
  }

});

var DisplayList = React.createClass({

  displayItem (item) {
    return (
      <DisplayItem item={item} handleDelete={this.props.handleDelete} />
    );
  },

  render () {
    return (
      <ul>
        { this.props.items.map(this.displayItem) }
      </ul>
    );
  }

});

var App = React.createClass({

  getInitialState () {
    return { text: '', items: [] };
  },

  handleDelete (itemToBeDeleted) {
    var newItems = this.state.items.filter((item) => { return (item !== itemToBeDeleted); } );
    this.setState({ items: newItems });
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

        <DisplayList items={this.state.items}
                     handleDelete={this.handleDelete} />
      </div>
    );
  }

});

React.render(<App />, document.body);
