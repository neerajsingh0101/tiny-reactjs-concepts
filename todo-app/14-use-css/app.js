var React = require('react');
var rand = require("random-key");
var Firebase = require('firebase');

var DisplayItem = React.createClass({

  propTypes: {
      handleDelete: React.PropTypes.func.isRequired,
      handleDone: React.PropTypes.func.isRequired,
      item: React.PropTypes.object.isRequired,
  },

  render () {
    var item = this.props.item;
    return (
      <li key={item.id} className={item.done ? "done" : ""}>
        <input  type="checkbox"
                checked={item.done}
                onChange={this.props.handleDone.bind(null, item.id)} />

        <label>{ item.text }</label>

        <a href='#' className="destroy"
                    onClick={this.props.handleDelete.bind(null, item.id)}>
          [x]
        </a>
      </li>
    );
  }

});

var DisplayList = React.createClass({

  propTypes: {
      handleDelete: React.PropTypes.func.isRequired,
      handleDone: React.PropTypes.func.isRequired
  },

  displayItem (item) {
    return (
      <section id="main">
        <DisplayItem  key={item.id}
                      item={item}
                      handleDelete={this.props.handleDelete}
                      handleDone={this.props.handleDone} />
      </section>
    );
  },

  render () {
    return (
      <ul id="todo-list">
        { this.props.items.map(this.displayItem) }
      </ul>
    );
  }

});

var App = React.createClass({

  componentWillMount () {
    this.firebase = new Firebase("https://test251.firebaseio.com/");

    this.firebase.on("value", function (data) {
                                        var obj = data.val();
                                        console.log(obj);
                                        if ( obj ) {
                                          var ids = Object.keys(obj);
                                          var items = [];
                                          ids.forEach(function(id) {
                                              var item = obj[id];
                                              item.id = id;
                                              items.push(item);
                                          });

                                          this.setState({ items: items });
                                        }
    }.bind(this)
                    );
  },

  getInitialState () {
    return { text: '', items: [] };
  },

  handleDone (taskId) {
    var _items = this.state.items;
    var item = _items.filter((item) => { return (item.id === taskId); } )[0];
    item.done = !item.done;

    console.log(item.id, item.done);
    this.firebase.child(item.id).update({ done: item.done });

    this.setState({ items: _items });
  },

  handleDelete (taskId) {
    var newItems = this.state.items.filter((item) => { return (item.id !== taskId); } );
    this.firebase.child(taskId).remove();
    this.setState({ items: newItems });
  },

  handleSubmit (event) {
    event.preventDefault();

    var text = this.state.text;
    var id = rand.generate();
    var newData = { text: text, done: false };

    this.firebase.child(id).set(newData);

    newData.id = id;
    var newItems = this.state.items.concat(newData);
    this.setState({ text: '', items: newItems });

  },

  handleChange (event) {
    var text = event.target.value;
    this.setState({ text: text });
  },

  handleClearCompleted () {
    var newItems = this.state.items.filter((item) => { return !item.done; } );
    this.setState({ items: newItems });
  },

  render () {
    return (
      <div>
        <h1> TODO </h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.text} />
        </form>

        <DisplayList items={this.state.items}
                     handleDone={this.handleDone}
                     handleDelete={this.handleDelete} />
        <footer>
          All({ this.state.items.length }) |
          Completed({ this.state.items.filter((item) => { return item.done; }).length })
          Pending({ this.state.items.filter((item) => { return !item.done; }).length }) |
          <a href='#' onClick={this.handleClearCompleted}>Clear Completed</a>
        </footer>
      </div>

    );
  }

});

React.render(<App />, document.getElementById("todoapp"));
