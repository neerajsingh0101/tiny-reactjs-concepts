var React = require('react');
var rand = require("random-key");

var DisplayItem = React.createClass({

  render () {
    var item = this.props.item;
    return <li key={item.id}>
            <input type="checkbox" checked={item.done} onChange={this.props.handleDone.bind(null, item.id)} />
            { item.text }
            <a href='#' onClick={this.props.handleDelete.bind(null, item.id)}>[x]</a>
           </li>
  }

})

var DisplayList = React.createClass({

  displayItem (item) {
    return <DisplayItem item={item} handleDelete={this.props.handleDelete} handleDone={this.props.handleDone} />
  },

  render () {
    return <ul>{ this.props.items.map(this.displayItem) }</ul>
  }

});

var App = React.createClass({

  getInitialState () {
    return { text: '', items: [] }
  },

  handleDone (taskId) {
    var _items = this.state.items;
    var item = _items.filter((item) => { return item.id == taskId } )[0];
    item.done = !item.done;
    this.setState({ items: _items });
  },

  handleDelete (taskId) {
    var newItems = this.state.items.filter((item) => { return item.id != taskName } );
    this.setState({ items: newItems });
  },

  handleSubmit (event) {
    event.preventDefault();

    var text = this.state.text;
    var newItems = this.state.items.concat({ text: text, done: false, id: rand.generate()});
    this.setState({ text: '', items: newItems });
  },

  handleChange (event) {
    var text = event.target.value;
    this.setState({ text: text });
  },

  handleClearCompleted () {
    var newItems = this.state.items.filter((item) => { return !item.done } );
    this.setState({ items: newItems });
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
          All({ this.state.items.length }) |
          Completed({ this.state.items.filter((item) => { return item.done }).length })
          Pending({ this.state.items.filter((item) => { return !item.done }).length }) |
          <a href='#' onClick={this.handleClearCompleted}>Clear Completed</a>
        </p>

        <DisplayList items={this.state.items}
                     handleDone={this.handleDone}
                     handleDelete={this.handleDelete} />
      </div>
    );
  }

});

React.render(<App />, document.body);
